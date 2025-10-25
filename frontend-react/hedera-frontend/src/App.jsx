import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const mockData = {
  events: [
    {
      id: '1',
      title: 'Web3 Developer Meetup',
      description: 'Join us for an exciting discussion about the future of Web3 development on Hedera.',
      date: '2025-02-15',
      time: '18:00',
      location: 'Virtual Event',
      attendees: 45,
      maxAttendees: 100,
      reward: '50 HBAR',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Hedera Hackathon 2025',
      description: 'Build the next generation of DApps on Hedera. Prizes worth 10,000 HBAR!',
      date: '2025-03-01',
      time: '09:00',
      location: 'Online',
      attendees: 120,
      maxAttendees: 200,
      reward: '500 HBAR',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'NFT Marketplace Workshop',
      description: 'Learn how to build and deploy NFT marketplaces on Hedera with hands-on coding sessions.',
      date: '2025-02-20',
      time: '14:00',
      location: 'San Francisco, CA',
      attendees: 78,
      maxAttendees: 150,
      reward: '100 HBAR',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'DeFi Protocol Deep Dive',
      description: 'Explore advanced DeFi concepts and build your own protocol on Hedera.',
      date: '2025-02-25',
      time: '16:30',
      location: 'Virtual Event',
      attendees: 92,
      maxAttendees: 120,
      reward: '150 HBAR',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Hedera Consensus Service Workshop',
      description: 'Master the Hedera Consensus Service and build real-time applications.',
      date: '2025-03-10',
      time: '11:00',
      location: 'New York, NY',
      attendees: 34,
      maxAttendees: 80,
      reward: '75 HBAR',
      status: 'upcoming'
    }
  ],
  quizzes: [
    {
      id: '1',
      title: 'Hedera Basics Quiz',
      description: 'Test your knowledge about Hedera Hashgraph fundamentals',
      questions: 10,
      timeLimit: 15,
      reward: '25 HBAR',
      difficulty: 'Beginner',
      participants: 234,
      status: 'active'
    },
    {
      id: '2',
      title: 'Smart Contracts on Hedera',
      description: 'Advanced quiz about Hedera Smart Contract Service',
      questions: 15,
      timeLimit: 20,
      reward: '75 HBAR',
      difficulty: 'Advanced',
      participants: 89,
      status: 'active'
    },
    {
      id: '3',
      title: 'Hedera Token Service (HTS)',
      description: 'Learn about creating and managing tokens on Hedera',
      questions: 12,
      timeLimit: 18,
      reward: '40 HBAR',
      difficulty: 'Intermediate',
      participants: 156,
      status: 'active'
    },
    {
      id: '4',
      title: 'Consensus Mechanisms',
      description: 'Deep dive into Hashgraph consensus and its advantages',
      questions: 20,
      timeLimit: 25,
      reward: '100 HBAR',
      difficulty: 'Expert',
      participants: 67,
      status: 'active'
    },
    {
      id: '5',
      title: 'Hedera File Service',
      description: 'Understanding distributed file storage on Hedera',
      questions: 8,
      timeLimit: 12,
      reward: '30 HBAR',
      difficulty: 'Beginner',
      participants: 198,
      status: 'active'
    }
  ],
  users: [
    { id: '1', name: 'Alice Johnson', avatar: 'AJ', status: 'online', role: 'Developer' },
    { id: '2', name: 'Bob Smith', avatar: 'BS', status: 'online', role: 'Designer' },
    { id: '3', name: 'Carol Davis', avatar: 'CD', status: 'away', role: 'Product Manager' },
    { id: '4', name: 'David Wilson', avatar: 'DW', status: 'online', role: 'Developer' },
    { id: '5', name: 'Emma Rodriguez', avatar: 'ER', status: 'online', role: 'Blockchain Engineer' },
    { id: '6', name: 'Frank Chen', avatar: 'FC', status: 'online', role: 'Smart Contract Developer' },
    { id: '7', name: 'Grace Kim', avatar: 'GK', status: 'away', role: 'DevOps Engineer' },
    { id: '8', name: 'Henry Martinez', avatar: 'HM', status: 'online', role: 'Full Stack Developer' },
    { id: '9', name: 'Ivy Thompson', avatar: 'IT', status: 'online', role: 'UI/UX Designer' },
    { id: '10', name: 'Jack Brown', avatar: 'JB', status: 'away', role: 'Technical Writer' }
  ],
  chatMessages: [
    { id: '1', userId: '1', userName: 'Alice Johnson', message: 'Hey everyone! Excited about the upcoming hackathon!', timestamp: '10:30 AM', avatar: 'AJ' },
    { id: '2', userId: '2', userName: 'Bob Smith', message: 'Same here! Already started brainstorming ideas 🚀', timestamp: '10:32 AM', avatar: 'BS' },
    { id: '3', userId: '3', userName: 'Carol Davis', message: 'The Web3 meetup was amazing last week. Great insights!', timestamp: '10:35 AM', avatar: 'CD' },
    { id: '4', userId: '4', userName: 'David Wilson', message: 'Anyone working on DeFi projects? Would love to collaborate', timestamp: '10:38 AM', avatar: 'DW' },
    { id: '5', userId: '5', userName: 'Emma Rodriguez', message: 'Just completed the Smart Contracts quiz! The questions were challenging but fair.', timestamp: '10:42 AM', avatar: 'ER' },
    { id: '6', userId: '6', userName: 'Frank Chen', message: 'The NFT workshop next week looks interesting. Anyone else planning to attend?', timestamp: '10:45 AM', avatar: 'FC' },
    { id: '7', userId: '7', userName: 'Grace Kim', message: 'I\'m working on a supply chain DApp using Hedera. Happy to share my experience!', timestamp: '10:48 AM', avatar: 'GK' },
    { id: '8', userId: '8', userName: 'Henry Martinez', message: 'Does anyone have experience with Hedera Token Service? Need some guidance.', timestamp: '10:52 AM', avatar: 'HM' },
    { id: '9', userId: '1', userName: 'Alice Johnson', message: '@Henry Martinez I\'ve worked with HTS extensively. Feel free to DM me!', timestamp: '10:54 AM', avatar: 'AJ' },
    { id: '10', userId: '9', userName: 'Ivy Thompson', message: 'The UI/UX for Web3 apps is so important. Glad to see focus on user experience here!', timestamp: '10:56 AM', avatar: 'IT' },
    { id: '11', userId: '10', userName: 'Jack Brown', message: 'Working on documentation for a new Hedera project. Community feedback would be great!', timestamp: '11:00 AM', avatar: 'JB' },
    { id: '12', userId: '2', userName: 'Bob Smith', message: 'The leaderboard competition is getting intense! 💪', timestamp: '11:03 AM', avatar: 'BS' }
  ],
  notifications: [
    { id: '1', type: 'event', message: 'New event: Web3 Developer Meetup', time: '2 hours ago' },
    { id: '2', type: 'quiz', message: 'Quiz completed: Hedera Basics (+25 HBAR)', time: '1 day ago' },
    { id: '3', type: 'reward', message: 'Reward earned: 50 HBAR from event participation', time: '2 days ago' },
    { id: '4', type: 'event', message: 'Registered for: NFT Marketplace Workshop', time: '3 hours ago' },
    { id: '5', type: 'achievement', message: 'Achievement unlocked: Quiz Master (5 quizzes completed)', time: '1 day ago' },
    { id: '6', type: 'leaderboard', message: 'You moved up to #3 on the leaderboard!', time: '2 days ago' }
  ]
};

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState(mockData);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuth = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleAdminAccess = () => {
    setCurrentUser({ id: 'admin1', name: 'Admin User', role: 'admin' });
    navigate('/admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    const breadcrumbs = {
      '/': 'Home',
      '/login': 'Home / Login',
      '/signup': 'Home / Sign Up',
      '/dashboard': 'Home / Dashboard',
      '/admin': 'Home / Admin Dashboard'
    };
    return breadcrumbs[path] || 'Home';
  };

  return (
    <div>
      <Header 
        currentUser={currentUser}
        notifications={data.notifications}
        onLogout={handleLogout}
        onNavigate={navigate}
      />
      
      {location.pathname !== '/' && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-2">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-blue-700">{getBreadcrumb()}</p>
          </div>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={
          <div>
            <LandingPage 
              onConnectWallet={() => navigate('/dashboard')} 
              onGetStarted={() => navigate('/signup')}
              onAdminAccess={handleAdminAccess}
            />
          </div>
        } />
        
        <Route path="/login" element={
          <LoginPage 
            onLogin={handleAuth}
            onBackToLanding={() => navigate('/')}
            onGoToSignup={() => navigate('/signup')}
          />
        } />
        
        <Route path="/signup" element={
          <SignupPage 
            onSignup={handleAuth}
            onBackToLanding={() => navigate('/')}
            onGoToLogin={() => navigate('/login')}
          />
        } />
        
        <Route path="/admin" element={
          <AdminDashboard 
            events={data.events}
            setEvents={() => {}}
            quizzes={data.quizzes}
            setQuizzes={() => {}}
            users={data.users}
            onLogout={handleLogout}
            currentUser={currentUser}
          />
        } />
        
        <Route path="/dashboard" element={
          <UserDashboard
            userId={currentUser?.id || "user1"}
            connectedWallet={{ balance: '0' }}
            events={data.events}
            setEvents={(events) => setData(prev => ({ ...prev, events }))}
            quizzes={data.quizzes}
            chatMessages={data.chatMessages}
            setChatMessages={(messages) => setData(prev => ({ ...prev, chatMessages: messages }))}
            users={data.users}
            notifications={data.notifications}
            onLogout={handleLogout}
            currentUser={currentUser}
          />
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
} 