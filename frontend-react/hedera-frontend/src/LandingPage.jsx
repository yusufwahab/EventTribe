import React from 'react';
import { Calendar, Trophy, MessageSquare, Users, Wallet, Shield, Zap, Globe, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const LandingPage = ({ onConnectWallet, onGetStarted, onAdminAccess }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex items-center min-h-screen">
          <div className="text-center w-full">
            <div className="inline-block mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-white font-medium">🚀 Revolutionizing Event Management with Hedera</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Events That
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Actually Work
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop losing money to middlemen, fake attendees, and broken payment systems. 
              Build trust with blockchain-verified events and instant HBAR rewards.
            </p>
            
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={onGetStarted}
                className="px-10 py-4 bg-white text-blue-900 rounded-xl text-lg font-semibold transition shadow-2xl hover:shadow-white/25 hover:scale-105"
              >
                Start Building Events
              </button>
              <button
                onClick={onConnectWallet}
                className="px-10 py-4 bg-blue-600/80 backdrop-blur-sm hover:bg-blue-500/80 text-white rounded-xl text-lg font-semibold transition flex items-center gap-3 border border-blue-400/50"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Traditional Events Are <span className="text-red-600">Broken</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Event organizers and attendees face countless problems that blockchain technology can solve
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">High Platform Fees</h3>
              <p className="text-gray-600">Traditional platforms charge 3-8% fees plus payment processing, eating into your profits</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fake Registrations</h3>
              <p className="text-gray-600">No way to verify real attendees, leading to inflated numbers and wasted resources</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delayed Payments</h3>
              <p className="text-gray-600">Wait weeks for payouts while platforms hold your money and earn interest</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Engagement Rewards</h3>
              <p className="text-gray-600">Attendees have no incentive to participate actively or provide feedback</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Limited Analytics</h3>
              <p className="text-gray-600">Basic metrics with no real-time insights or attendee behavior data</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust Issues</h3>
              <p className="text-gray-600">No transparency in ticket sales, refunds, or event authenticity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blockchain Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hedera Events eliminates these problems with transparent, efficient, and rewarding event management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Platform Fees</h3>
              <p className="text-gray-600 mb-4">Pay only minimal Hedera network fees (fractions of a cent). Keep 99.9% of your revenue.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Save $1000s per event</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Attendees</h3>
              <p className="text-gray-600 mb-4">Blockchain-verified registrations eliminate fake attendees and ensure accurate metrics.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>100% authentic data</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Payments</h3>
              <p className="text-gray-600 mb-4">Receive HBAR payments instantly. No waiting periods or payment holds.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Immediate settlement</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reward System</h3>
              <p className="text-gray-600 mb-4">Incentivize attendance and engagement with automatic HBAR rewards for participants.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Boost engagement 300%</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600 mb-4">Advanced blockchain analytics provide deep insights into attendee behavior and engagement.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>10x better insights</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Transparency</h3>
              <p className="text-gray-600 mb-4">All transactions, registrations, and rewards are recorded on Hedera's public ledger.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Immutable trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">$2.3M+</div>
              <div className="text-gray-600">Saved in Platform Fees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-gray-600">Verified Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">1,200+</div>
              <div className="text-gray-600">Successful Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who've already made the switch to blockchain-powered events
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold transition hover:bg-blue-50 shadow-2xl flex items-center gap-3"
            >
              Start Your First Event
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onAdminAccess}
              className="px-10 py-4 bg-blue-500/20 backdrop-blur-sm text-white rounded-xl text-lg font-semibold transition hover:bg-blue-400/30 border border-blue-400/50"
            >
              View Admin Demo
            </button>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            No setup fees • No monthly costs • Start earning immediately
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-semibold">Hedera Events</span>
              </div>
              <p className="text-gray-400 text-sm">Revolutionizing event management with blockchain technology</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Create Events</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Analytics</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Rewards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Hedera Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;