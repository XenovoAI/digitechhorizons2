import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, Settings, ExternalLink, Shield, Clock, AlertCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProtectionMetrics {
  protected_content_count: number;
  monitoring_uptime: number;
  threats_blocked: number;
  last_scan: string;
}

interface ContentScan {
  id: string;
  scan_date: string;
  status: string;
  findings: {
    threats: number;
    scanned_urls: number;
    protected_assets: number;
  };
}

const UserDashboard = () => {
  const { signOut, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ProtectionMetrics | null>(null);
  const [recentScans, setRecentScans] = useState<ContentScan[]>([]);

  const fetchDashboardData = async (showRefreshState = false) => {
    try {
      if (!session?.user?.id) return;

      if (showRefreshState) {
        setRefreshing(true);
      }

      setError(null);

      // Fetch protection metrics
      const { data: metricsData, error: metricsError } = await supabase
        .from('protection_metrics')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (metricsError) throw metricsError;

      // Fetch recent scans
      const { data: scansData, error: scansError } = await supabase
        .from('content_scans')
        .select('*')
        .eq('user_id', session.user.id)
        .order('scan_date', { ascending: false })
        .limit(5);

      if (scansError) throw scansError;

      setMetrics(metricsData);
      setRecentScans(scansData || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
      if (showRefreshState) {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscription for metrics updates
    const metricsSubscription = supabase
      .channel('metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'protection_metrics',
          filter: `user_id=eq.${session?.user?.id}`,
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    // Set up real-time subscription for scan updates
    const scansSubscription = supabase
      .channel('scan_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'content_scans',
          filter: `user_id=eq.${session?.user?.id}`,
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      metricsSubscription.unsubscribe();
      scansSubscription.unsubscribe();
    };
  }, [session]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Protection Dashboard</h1>
            <p className="text-gray-300 mt-2">Real-time overview of your content protection status</p>
          </div>
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`h-5 w-5 text-white ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </motion.div>

        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-500">{error}</p>
            </div>
            <button
              onClick={() => fetchDashboardData(true)}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <FileText className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Protected Content</h3>
            <p className="text-3xl font-bold text-white">{metrics?.protected_content_count || 0}</p>
            <p className="text-sm text-gray-400 mt-2">Active protection enabled</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <Clock className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Monitoring Uptime</h3>
            <p className="text-3xl font-bold text-white">{metrics?.monitoring_uptime?.toFixed(1) || 100}%</p>
            <p className="text-sm text-gray-400 mt-2">Last 30 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <Shield className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Threats Blocked</h3>
            <p className="text-3xl font-bold text-white">{metrics?.threats_blocked || 0}</p>
            <p className="text-sm text-gray-400 mt-2">Total threats prevented</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Recent Scans</h3>
            {recentScans.length > 0 ? (
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {scan.status === 'completed' ? (
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-400" />
                      )}
                      <div>
                        <p className="font-medium text-white">
                          Scanned {scan.findings.scanned_urls} URLs
                        </p>
                        <p className="text-sm text-gray-400">
                          {formatDate(scan.scan_date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">
                        {scan.findings.threats} threats detected
                      </p>
                      <p className="text-sm text-gray-400">
                        {scan.findings.protected_assets} assets protected
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No scans recorded yet</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
                Submit New Content
              </button>
              <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-white transition-colors">
                <Bell className="h-5 w-5" />
                View Alerts
              </button>
              <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-white transition-colors">
                <Settings className="h-5 w-5" />
                Protection Settings
              </button>
              <button
                onClick={() => signOut()}
                className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;