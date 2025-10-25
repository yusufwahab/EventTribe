// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DAOGovernance is Ownable, ReentrancyGuard {
    struct Proposal {
        string title;
        string description;
        uint256 votingDeadline;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        bool cancelled;
        address proposer;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) voteWeight;
    }

    struct FairRaffle {
        string title;
        uint256 entryDeadline;
        uint256 prizeAmount;
        address[] participants;
        address winner;
        bool drawn;
        bytes32 randomSeed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => FairRaffle) public raffles;
    mapping(address => uint256) public tokenBalance; // Mock token balance for voting weight
    
    uint256 public nextProposalId = 1;
    uint256 public nextRaffleId = 1;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_PROPOSAL_TOKENS = 100;

    event ProposalCreated(uint256 indexed proposalId, string title, address proposer);
    event VoteCast(uint256 indexed proposalId, address voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    event RaffleCreated(uint256 indexed raffleId, string title, uint256 prizeAmount);
    event RaffleEntered(uint256 indexed raffleId, address participant);
    event RaffleDrawn(uint256 indexed raffleId, address winner);

    constructor() Ownable(msg.sender) {}

    function setTokenBalance(address _user, uint256 _balance) external onlyOwner {
        tokenBalance[_user] = _balance;
    }

    function createProposal(string memory _title, string memory _description) external returns (uint256) {
        require(tokenBalance[msg.sender] >= MIN_PROPOSAL_TOKENS, "Insufficient tokens");
        
        Proposal storage proposal = proposals[nextProposalId];
        proposal.title = _title;
        proposal.description = _description;
        proposal.votingDeadline = block.timestamp + VOTING_PERIOD;
        proposal.proposer = msg.sender;
        
        emit ProposalCreated(nextProposalId, _title, msg.sender);
        return nextProposalId++;
    }

    function vote(uint256 _proposalId, bool _support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.votingDeadline, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(tokenBalance[msg.sender] > 0, "No voting power");
        
        uint256 weight = tokenBalance[msg.sender];
        proposal.hasVoted[msg.sender] = true;
        proposal.voteWeight[msg.sender] = weight;
        
        if (_support) {
            proposal.yesVotes += weight;
        } else {
            proposal.noVotes += weight;
        }
        
        emit VoteCast(_proposalId, msg.sender, _support, weight);
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.votingDeadline, "Voting still active");
        require(!proposal.executed, "Already executed");
        require(proposal.yesVotes > proposal.noVotes, "Proposal rejected");
        
        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
    }

    function createRaffle(string memory _title, uint256 _entryPeriod) external payable onlyOwner {
        require(msg.value > 0, "Prize amount required");
        
        FairRaffle storage raffle = raffles[nextRaffleId];
        raffle.title = _title;
        raffle.entryDeadline = block.timestamp + _entryPeriod;
        raffle.prizeAmount = msg.value;
        
        emit RaffleCreated(nextRaffleId, _title, msg.value);
        nextRaffleId++;
    }

    function enterRaffle(uint256 _raffleId) external {
        FairRaffle storage raffle = raffles[_raffleId];
        require(block.timestamp < raffle.entryDeadline, "Entry period ended");
        require(!raffle.drawn, "Raffle already drawn");
        require(tokenBalance[msg.sender] > 0, "Need tokens to enter");
        
        // Check if already entered
        for (uint i = 0; i < raffle.participants.length; i++) {
            require(raffle.participants[i] != msg.sender, "Already entered");
        }
        
        raffle.participants.push(msg.sender);
        emit RaffleEntered(_raffleId, msg.sender);
    }

    function drawRaffle(uint256 _raffleId, bytes32 _randomSeed) external onlyOwner nonReentrant {
        FairRaffle storage raffle = raffles[_raffleId];
        require(block.timestamp >= raffle.entryDeadline, "Entry period not ended");
        require(!raffle.drawn, "Already drawn");
        require(raffle.participants.length > 0, "No participants");
        
        raffle.randomSeed = _randomSeed;
        uint256 winnerIndex = uint256(keccak256(abi.encodePacked(_randomSeed, block.timestamp))) % raffle.participants.length;
        raffle.winner = raffle.participants[winnerIndex];
        raffle.drawn = true;
        
        payable(raffle.winner).transfer(raffle.prizeAmount);
        emit RaffleDrawn(_raffleId, raffle.winner);
    }

    function getProposal(uint256 _proposalId) external view returns (
        string memory title,
        string memory description,
        uint256 votingDeadline,
        uint256 yesVotes,
        uint256 noVotes,
        bool executed,
        address proposer
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.votingDeadline,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.executed,
            proposal.proposer
        );
    }

    function getRaffleParticipants(uint256 _raffleId) external view returns (address[] memory) {
        return raffles[_raffleId].participants;
    }
}