import React, { useState } from 'react';
import { Calendar, Users, Trophy, TrendingUp, Plus, LogOut, Clock, MapPin, Award } from 'lucide-react';

// Mock Hedera Service for sending rewards
const HederaService = {
  sendReward: async (accountId, amount) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { transactionId: '0.0.12345@' + Date.now(), success: true };
  }
};

const AdminDashboard = ({ events, setEvents, quizzes, setQuizzes, users, onLogout }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    reward: ''
  });
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    questions: '',
    reward: '',
    timeLimit: ''
  });

  const createEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...(events || []), { ...newEvent, id: Date.now(), attendees: 0 }]);
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', category: '', reward: '' });
      setShowCreateForm(false);
      alert('Event created successfully!');
    }
  };

  const createQuiz = () => {
    if (newQuiz.title && newQuiz.questions) {
      setQuizzes([...(quizzes || []), { ...newQuiz, id: Date.now(), participants: 0 }]);
      setNewQuiz({ title: '', questions: '', reward: '', timeLimit: '' });
      alert('Quiz created successfully!');
    }
  };

  const sendReward = async (accountId, amount) => {
    try {
      const result = await HederaService.sendReward(accountId, amount);
      if (result.success) {
        alert(`Reward sent! Transaction ID: ${result.transactionId}`);
      }
    } catch (error) {
      alert('Failed to send reward: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Panel</span>
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Administrator
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Manage events, quizzes, and user rewards</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{events?.length || 0}</span>
            </div>
            <p className="text-gray-600 font-medium">Total Events</p>
            <p className="text-sm text-purple-600 mt-1">+12% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{users?.length || 0}</span>
            </div>
            <p className="text-gray-600 font-medium">Registered Users</p>
            <p className="text-sm text-blue-600 mt-1">+8% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{quizzes?.length || 0}</span>
            </div>
            <p className="text-gray-600 font-medium">Active Quizzes</p>
            <p className="text-sm text-yellow-600 mt-1">+5% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {events?.reduce((acc, e) => acc + e.attendees, 0) || 0}
              </span>
            </div>
            <p className="text-gray-600 font-medium">Total Participants</p>
            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200">
          <div className="flex border-b border-blue-200 bg-blue-50 rounded-t-xl">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Calendar className="w-4 h-4" />
              Manage Events
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${activeTab === 'quizzes' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              <Trophy className="w-4 h-4" />
              Manage Quizzes
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${activeTab === 'users' ? 'text-purple-600 border-b-2 border-purple-600 bg-white' : 'text-gray-600 hover:text-purple-600'}`}
            >
              <Users className="w-4 h-4" />
              Users & Rewards
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Events Management</h2>
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition shadow-lg shadow-blue-500/25"
                  >
                    <Plus className="w-4 h-4" />
                    Create Event
                  </button>
                </div>

                {showCreateForm && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
                    <h3 className="text-lg font-semibold mb-4 text-purple-900">Create New Event</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Event Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Reward (e.g., 100 HBAR)"
                        value={newEvent.reward}
                        onChange={(e) => setNewEvent({...newEvent, reward: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent md:col-span-2"
                        rows="3"
                      />
                    </div>
                    <button
                      onClick={createEvent}
                      className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      Create Event
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {events?.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees} attendees
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition">
                            Edit
                          </button>
                          <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Quiz Management</h2>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold mb-4 text-orange-900">Create New Quiz</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Quiz Title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Number of Questions"
                      value={newQuiz.questions}
                      onChange={(e) => setNewQuiz({...newQuiz, questions: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Reward (e.g., 25 HBAR)"
                      value={newQuiz.reward}
                      onChange={(e) => setNewQuiz({...newQuiz, reward: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Time Limit (e.g., 15 min)"
                      value={newQuiz.timeLimit}
                      onChange={(e) => setNewQuiz({...newQuiz, timeLimit: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={createQuiz}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Create Quiz
                  </button>
                </div>

                <div className="space-y-4">
                  {quizzes?.map((quiz) => (
                    <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{quiz.title}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>{quiz.questions} questions</span>
                            <span>Reward: {quiz.reward}</span>
                            <span>{quiz.participants} participants</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition">
                          Edit Questions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Users & Reward Distribution</h2>
                <div className="space-y-4">
                  {users?.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.avatar}
                            </div>
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'online' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {user.status}
                            </span>
                            <span>Points: {(parseInt(user.id) * 150 + Math.floor(Math.random() * 100))}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const amount = prompt('Enter reward amount in HBAR:');
                            if (amount) sendReward(`0.0.${user.id}`, amount);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition flex items-center gap-2 shadow-lg shadow-green-500/25"
                        >
                          <Award className="w-4 h-4" />
                          Send Reward
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;