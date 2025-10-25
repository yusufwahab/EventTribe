// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventUtilityToken is ERC20, Ownable {
    mapping(address => bool) public minters;
    mapping(address => uint256) public lastAirdrop;
    
    uint256 public constant AIRDROP_AMOUNT = 100 * 10**18; // 100 tokens
    uint256 public constant AIRDROP_COOLDOWN = 24 hours;
    
    event AirdropClaimed(address indexed recipient, uint256 amount);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor() ERC20("EventUtilityToken", "EUT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // Initial supply
    }

    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized minter");
        _;
    }

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
        emit MinterAdded(_minter);
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
        emit MinterRemoved(_minter);
    }

    function airdropOnCheckIn(address _attendee) external onlyMinter {
        require(block.timestamp >= lastAirdrop[_attendee] + AIRDROP_COOLDOWN, "Cooldown active");
        
        lastAirdrop[_attendee] = block.timestamp;
        _mint(_attendee, AIRDROP_AMOUNT);
        
        emit AirdropClaimed(_attendee, AIRDROP_AMOUNT);
    }

    function burnForRedemption(address _user, uint256 _amount) external onlyMinter {
        _burn(_user, _amount);
    }
}

contract CredentialManager is Ownable {
    struct Credential {
        string credentialType;
        string eventName;
        uint256 issueDate;
        bytes32 credentialHash;
        bool revoked;
    }

    mapping(address => mapping(bytes32 => Credential)) public credentials;
    mapping(address => bytes32[]) public userCredentials;
    
    event CredentialIssued(address indexed recipient, bytes32 indexed credentialId, string credentialType);
    event CredentialRevoked(address indexed recipient, bytes32 indexed credentialId);

    constructor() Ownable(msg.sender) {}

    function issueCredential(
        address _recipient,
        string memory _credentialType,
        string memory _eventName,
        bytes32 _credentialHash
    ) external onlyOwner returns (bytes32) {
        bytes32 credentialId = keccak256(abi.encodePacked(_recipient, _credentialType, _eventName, block.timestamp));
        
        credentials[_recipient][credentialId] = Credential({
            credentialType: _credentialType,
            eventName: _eventName,
            issueDate: block.timestamp,
            credentialHash: _credentialHash,
            revoked: false
        });
        
        userCredentials[_recipient].push(credentialId);
        
        emit CredentialIssued(_recipient, credentialId, _credentialType);
        return credentialId;
    }

    function revokeCredential(address _recipient, bytes32 _credentialId) external onlyOwner {
        require(credentials[_recipient][_credentialId].issueDate > 0, "Credential not found");
        credentials[_recipient][_credentialId].revoked = true;
        
        emit CredentialRevoked(_recipient, _credentialId);
    }

    function verifyCredential(address _holder, bytes32 _credentialId) external view returns (bool) {
        Credential memory cred = credentials[_holder][_credentialId];
        return cred.issueDate > 0 && !cred.revoked;
    }

    function getUserCredentials(address _user) external view returns (bytes32[] memory) {
        return userCredentials[_user];
    }
}