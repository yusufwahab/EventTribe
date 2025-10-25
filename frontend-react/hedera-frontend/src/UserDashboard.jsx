import React, { useState } from 'react';
import { Calendar, Trophy, MessageSquare, Users, Award, Search, Filter, TrendingUp, Clock, MapPin, Send, BarChart3 } from 'lucide-react';
import LiveFeedback from './LiveFeedback';

const UserDashboard = ({ 
  userId, 
  connectedWallet, 
  events, 
  setEvents, 
  quizzes, 
  chatMessages, 
  setChatMessages, 
  users, 
  notifications, 
  onLogout,
  currentUser 
}) => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatInput, setChatInput] = useState('');

  const registerForEvent = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
    ));
    alert('Successfully registered for event!');
  };

  const startQuiz = (quizId) => {
    alert(`Starting quiz: ${quizzes.find(q => q.id === quizId)?.title}`);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        userId: currentUser?.id || userId,
        userName: currentUser?.name || 'You',
        message: chatInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back, {currentUser?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Explore events, take quizzes, and earn rewards</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 mb-8">
          <div className="flex border-b border-blue-200">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${
                activeTab === 'events' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${
                activeTab === 'quizzes' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${
                activeTab === 'feedback' 
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Live Feedback
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${
                activeTab === 'chat' 
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Community Chat
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-4 font-medium flex items-center gap-2 transition ${
                activeTab === 'leaderboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Leaderboard
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 transition">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {events.filter(e => 
                    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((event) => (
                    <div key={event.id} className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden hover:shadow-xl transition group">
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-white opacity-50" />
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-700">
                          {event.status}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees}/{event.maxAttendees} attendees</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{event.reward}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => registerForEvent(event.id)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition font-medium shadow-lg shadow-blue-500/25"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Quizzes</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-white/90 backdrop-blur-sm border border-indigo-200 rounded-xl p-6 hover:shadow-xl transition">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-semibold text-gray-800">{quiz.questions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Time Limit:</span>
                          <span className="font-semibold text-gray-800">{quiz.timeLimit} min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className="font-semibold text-gray-800">{quiz.difficulty}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Participants:</span>
                          <span className="font-semibold text-gray-800">{quiz.participants}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Reward:</span>
                          <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{quiz.reward}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => startQuiz(quiz.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition font-medium shadow-lg shadow-indigo-500/25"
                      >
                        Start Quiz
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Earn Rewards</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Complete quizzes to earn HBAR tokens directly to your wallet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Attend events and participate in activities for bonus rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Top performers on leaderboard receive monthly prizes</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && <LiveFeedback />}

            {activeTab === 'chat' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Community Chat</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{users.filter(u => u.status === 'online').length} online</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 border-b border-purple-200">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-800">General Discussion</span>
                        </div>
                      </div>

                      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white">
                        {chatMessages.length === 0 ? (
                          <div className="text-center text-gray-500 mt-20">
                            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No messages yet. Start the conversation!</p>
                          </div>
                        ) : (
                          chatMessages.map((msg) => (
                            <div key={msg.id} className="flex gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {msg.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-gray-800">{msg.userName}</span>
                                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                </div>
                                <p className="text-gray-700">{msg.message}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-4 border-t border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <button
                            onClick={sendMessage}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition font-medium flex items-center gap-2 shadow-lg shadow-purple-500/25"
                          >
                            <Send className="w-4 h-4" />
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-800 mb-3">Online Users</h3>
                      <div className="space-y-2">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {user.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-800 truncate">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Community Guidelines:</strong> Be respectful, stay on topic, and help create a positive environment for all members.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Contributors</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                    <Trophy className="w-8 h-8 mb-2" />
                    <div className="text-3xl font-bold mb-1">1st Place</div>
                    <div className="text-lg text-blue-100">1000 HBAR Prize</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <Award className="w-8 h-8 mb-2" />
                    <div className="text-3xl font-bold mb-1">2nd Place</div>
                    <div className="text-lg text-indigo-100">500 HBAR Prize</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <Award className="w-8 h-8 mb-2" />
                    <div className="text-3xl font-bold mb-1">3rd Place</div>
                    <div className="text-lg text-purple-100">250 HBAR Prize</div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Points</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-200">
                      {users.map((user, index) => (
                        <tr key={user.id} className="hover:bg-blue-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {index === 0 && <Trophy className="w-5 h-5 text-blue-600" />}
                              {index === 1 && <Award className="w-5 h-5 text-indigo-600" />}
                              {index === 2 && <Award className="w-5 h-5 text-purple-600" />}
                              <span className="font-semibold text-lg text-gray-800">#{index + 1}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.avatar}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{(index + 1) * 150 + Math.floor(Math.random() * 100)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'online' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">How Points Work</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        +50
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Event Attendance</div>
                        <div className="text-sm text-gray-600">Attend and participate in events</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        +100
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Quiz Completion</div>
                        <div className="text-sm text-gray-600">Complete quizzes successfully</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        +25
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Community Engagement</div>
                        <div className="text-sm text-gray-600">Active participation in chat</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        +200
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Special Achievements</div>
                        <div className="text-sm text-gray-600">Unlock milestones and badges</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;