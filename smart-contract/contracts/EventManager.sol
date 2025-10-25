// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EventManager is ERC721, Ownable, ReentrancyGuard {
    struct Event {
        string name;
        uint256 ticketPrice;
        uint256 maxAttendees;
        uint256 currentAttendees;
        uint256 eventDate;
        bool cancelled;
        address organizer;
        uint256 royaltyPercentage; // For secondary sales
    }

    struct Ticket {
        uint256 eventId;
        address originalOwner;
        bool used;
        uint256 mintTimestamp;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => mapping(address => bool)) public eventAttendees;
    mapping(address => uint256[]) public userTickets;
    
    uint256 public nextEventId = 1;
    uint256 public nextTicketId = 1;
    
    event EventCreated(uint256 indexed eventId, string name, address organizer);
    event TicketMinted(uint256 indexed ticketId, uint256 indexed eventId, address owner);
    event TicketUsed(uint256 indexed ticketId, uint256 indexed eventId);
    event EventCancelled(uint256 indexed eventId);
    event RefundProcessed(uint256 indexed ticketId, address recipient, uint256 amount);

    constructor() ERC721("EventTicket", "ETKT") Ownable(msg.sender) {}

    function createEvent(
        string memory _name,
        uint256 _ticketPrice,
        uint256 _maxAttendees,
        uint256 _eventDate,
        uint256 _royaltyPercentage
    ) external returns (uint256) {
        require(_royaltyPercentage <= 1000, "Royalty too high"); // Max 10%
        
        events[nextEventId] = Event({
            name: _name,
            ticketPrice: _ticketPrice,
            maxAttendees: _maxAttendees,
            currentAttendees: 0,
            eventDate: _eventDate,
            cancelled: false,
            organizer: msg.sender,
            royaltyPercentage: _royaltyPercentage
        });
        
        emit EventCreated(nextEventId, _name, msg.sender);
        return nextEventId++;
    }

    function mintTicket(uint256 _eventId) external payable nonReentrant {
        Event storage event_ = events[_eventId];
        require(event_.currentAttendees < event_.maxAttendees, "Event full");
        require(!event_.cancelled, "Event cancelled");
        require(msg.value >= event_.ticketPrice, "Insufficient payment");
        require(!eventAttendees[_eventId][msg.sender], "Already registered");

        tickets[nextTicketId] = Ticket({
            eventId: _eventId,
            originalOwner: msg.sender,
            used: false,
            mintTimestamp: block.timestamp
        });

        eventAttendees[_eventId][msg.sender] = true;
        userTickets[msg.sender].push(nextTicketId);
        event_.currentAttendees++;

        _mint(msg.sender, nextTicketId);
        
        // Transfer payment to organizer (minus royalty reserve)
        uint256 organizerAmount = (msg.value * (1000 - event_.royaltyPercentage)) / 1000;
        payable(event_.organizer).transfer(organizerAmount);
        
        emit TicketMinted(nextTicketId, _eventId, msg.sender);
        nextTicketId++;
    }

    function useTicket(uint256 _ticketId) external {
        require(ownerOf(_ticketId) == msg.sender, "Not ticket owner");
        Ticket storage ticket = tickets[_ticketId];
        require(!ticket.used, "Ticket already used");
        
        ticket.used = true;
        emit TicketUsed(_ticketId, ticket.eventId);
    }

    function cancelEvent(uint256 _eventId) external {
        Event storage event_ = events[_eventId];
        require(msg.sender == event_.organizer || msg.sender == owner(), "Not authorized");
        require(!event_.cancelled, "Already cancelled");
        
        event_.cancelled = true;
        emit EventCancelled(_eventId);
    }

    function requestRefund(uint256 _ticketId) external nonReentrant {
        require(ownerOf(_ticketId) == msg.sender, "Not ticket owner");
        Ticket storage ticket = tickets[_ticketId];
        Event storage event_ = events[ticket.eventId];
        
        require(event_.cancelled || block.timestamp < event_.eventDate - 24 hours, "Refund not available");
        require(!ticket.used, "Ticket already used");
        
        uint256 refundAmount = event_.ticketPrice;
        _burn(_ticketId);
        
        payable(msg.sender).transfer(refundAmount);
        emit RefundProcessed(_ticketId, msg.sender, refundAmount);
    }

    function getUserTickets(address _user) external view returns (uint256[] memory) {
        return userTickets[_user];
    }

    function getEvent(uint256 _eventId) external view returns (Event memory) {
        return events[_eventId];
    }
}