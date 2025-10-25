import React, { useState } from 'react';
import { BarChart3, CheckCircle, DollarSign, GraduationCap, Gift } from 'lucide-react';

const LiveFeedback = () => {
  const [activeTab, setActiveTab] = useState('polls');
  const [selectedPoll, setSelectedPoll] = useState(null);

  const mockPolls = [
    {
      id: '1',
      title: 'Rate the Keynote Speaker',
      question: 'How would you rate today\'s keynote presentation?',
      options: ['Excellent', 'Good', 'Average', 'Poor'],
      votes: [45, 23, 8, 2],
      totalVotes: 78,
      status: 'active',
      endTime: '2025-01-15T16:00:00Z'
    },
    {
      id: '2',
      title: 'Session Feedback: Smart Contracts',
      question: 'Was the smart contracts workshop helpful?',
      options: ['Very Helpful', 'Somewhat Helpful', 'Not Helpful'],
      votes: [34, 12, 3],
      totalVotes: 49,
      status: 'active',
      endTime: '2025-01-15T17:30:00Z'
    }
  ];

  const mockGovernance = [
    {
      id: '1',
      title: 'Next Event Location',
      description: 'Vote on the location for our next annual conference',
      options: ['San Francisco', 'New York', 'London', 'Tokyo'],
      votes: [156, 134, 89, 67],
      totalVotes: 446,
      requiredTokens: 10,
      endDate: '2025-02-01',
      status: 'active'
    },
    {
      id: '2',
      title: 'Charity Partner Selection',
      description: 'Choose our charity partner for 2025',
      options: ['Tech Education Fund', 'Environmental Initiative', 'Healthcare Access'],
      votes: [89, 67, 78],
      totalVotes: 234,
      requiredTokens: 5,
      endDate: '2025-01-25',
      status: 'active'
    }
  ];

  const mockCredentials = [
    {
      id: '1',
      title: 'Web3 Developer Certification',
      event: 'Hedera Hackathon 2025',
      issueDate: '2025-01-15',
      credentialHash: '0x1a2b3c4d5e6f...',
      status: 'issued',
      type: 'completion'
    },
    {
      id: '2',
      title: 'Smart Contract Workshop Attendance',
      event: 'Advanced Hedera Workshop',
      issueDate: '2025-01-10',
      credentialHash: '0x9f8e7d6c5b4a...',
      status: 'issued',
      type: 'attendance'
    }
  ];

  const mockTokens = [
    {
      id: '1',
      name: 'Hackathon Utility Token',
      symbol: 'HUT',
      amount: 50,
      event: 'Hedera Hackathon 2025',
      receivedDate: '2025-01-15',
      uses: ['Event Discounts', 'Digital Downloads', 'Merchandise']
    },
    {
      id: '2',
      name: 'Workshop Access Token',
      symbol: 'WAT',
      amount: 25,
      event: 'Smart Contract Workshop',
      receivedDate: '2025-01-10',
      uses: ['Future Workshop Access', 'Premium Content']
    }
  ];

  const handleVote = (pollId, optionIndex) => {
    console.log(`Voting for poll ${pollId}, option ${optionIndex}`);
    // Implement HCS transaction here
  };

  const handleGovernanceVote = (proposalId, optionIndex) => {
    console.log(`Governance vote for proposal ${proposalId}, option ${optionIndex}`);
    // Implement token-gated voting here
  };

  const requestRefund = (eventId) => {
    console.log(`Requesting refund for event ${eventId}`);
    // Implement smart contract refund logic here
  };

  const renderPolls = () => (
    <div className="space-y-6">
      {mockPolls.map((poll) => (
        <div key={poll.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
              <p className="text-gray-600 mt-1">{poll.question}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {poll.status}
            </span>
          </div>
          
          <div className="space-y-3">
            {poll.options.map((option, index) => {
              const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes * 100) : 0;
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => handleVote(poll.id, index)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option}</span>
                      <span className="text-sm text-gray-500">{poll.votes[index]} votes ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Total votes: {poll.totalVotes} • Ends: {new Date(poll.endTime).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-6">
      {mockGovernance.map((proposal) => (
        <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
              <p className="text-gray-600 mt-1">{proposal.description}</p>
              <p className="text-sm text-blue-600 mt-2">Requires {proposal.requiredTokens} tokens to vote</p>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Governance
            </span>
          </div>
          
          <div className="space-y-3">
            {proposal.options.map((option, index) => {
              const percentage = proposal.totalVotes > 0 ? (proposal.votes[index] / proposal.totalVotes * 100) : 0;
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => handleGovernanceVote(proposal.id, index)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option}</span>
                      <span className="text-sm text-gray-500">{proposal.votes[index]} votes ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Total votes: {proposal.totalVotes} • Ends: {proposal.endDate}
          </div>
        </div>
      ))}
    </div>
  );

  const renderRefunds = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Contract Refunds</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          Refunds are automatically processed by smart contracts when conditions are met. 
          No manual intervention required - 100% transparent and trustworthy.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">Web3 Developer Meetup</h4>
              <p className="text-sm text-gray-600">Event Date: January 20, 2025</p>
              <p className="text-sm text-gray-600">Ticket Price: 50 HBAR</p>
            </div>
            <button
              onClick={() => requestRefund('event1')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Request Refund
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Refund available until: January 18, 2025 (48 hours before event)
          </div>
        </div>
      </div>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      {mockCredentials.map((credential) => (
        <div key={credential.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{credential.title}</h3>
                <p className="text-gray-600">{credential.event}</p>
                <p className="text-sm text-gray-500 mt-1">Issued: {credential.issueDate}</p>
                <p className="text-xs text-gray-400 mt-2 font-mono">Hash: {credential.credentialHash}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Download Certificate
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Share Credential
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTokens = () => (
    <div className="space-y-6">
      {mockTokens.map((token) => (
        <div key={token.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
                <p className="text-gray-600">{token.event}</p>
                <p className="text-sm text-gray-500 mt-1">Received: {token.receivedDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{token.amount}</div>
              <div className="text-sm text-gray-500">{token.symbol}</div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Redeemable for:</h4>
            <div className="flex flex-wrap gap-2">
              {token.uses.map((use, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {use}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              Redeem Tokens
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'polls', name: 'Live Polls', icon: BarChart3 },
    { id: 'governance', name: 'Governance', icon: CheckCircle },
    { id: 'refunds', name: 'Smart Refunds', icon: DollarSign },
    { id: 'credentials', name: 'Credentials', icon: GraduationCap },
    { id: 'tokens', name: 'Event Tokens', icon: Gift }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Immutable Live Feedback</h1>
        <p className="text-gray-600">
          Transparent, tamper-proof event interactions powered by Hedera Consensus Service
        </p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {activeTab === 'polls' && renderPolls()}
        {activeTab === 'governance' && renderGovernance()}
        {activeTab === 'refunds' && renderRefunds()}
        {activeTab === 'credentials' && renderCredentials()}
        {activeTab === 'tokens' && renderTokens()}
      </div>
    </div>
  );
};

export default LiveFeedback;