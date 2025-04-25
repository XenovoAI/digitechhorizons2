import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileWarning, BarChart3, Settings, Facebook, Users, Globe, Database, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import FacebookAdsManager from '../components/admin/FacebookAdsManager';

const DashboardPage = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });

        if (error) throw error;
        setUserCount(count || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'ads':
        return <FacebookAdsManager />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <Users className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Total Users</h3>
                <p className="text-3xl font-bold text-white">{loading ? '...' : userCount}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <Shield className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Protected Assets</h3>
                <p className="text-3xl font-bold text-white">127</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <Globe className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Active Domains</h3>
                <p className="text-3xl font-bold text-white">45</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <Database className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Storage Used</h3>
                <p className="text-3xl font-bold text-white">2.1TB</p>
              </motion.div>
            </div>

            {error && (
              <div className="mb-8 bg-red-500/10 border border-red-500 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-500">{error}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-2 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-white">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <FileWarning className="h-6 w-6 text-yellow-400" />
                        <div>
                          <p className="font-medium text-white">New User Registration</p>
                          <p className="text-sm text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 text-white">
                    <Shield className="h-5 w-5" />
                    Add New Asset
                  </button>
                  <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    View Reports
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center gap-2"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">Monitor and manage your platform</p>
        </motion.div>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'ads' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            <Facebook className="w-4 h-4" />
            Facebook Ads
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;