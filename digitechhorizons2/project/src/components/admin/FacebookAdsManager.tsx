import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, DollarSign, BarChart3, Users, Settings, AlertCircle } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  reach: number;
}

const FacebookAdsManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch actual campaign data
    const mockCampaigns = [
      {
        id: '1',
        name: 'Spring Promotion',
        status: 'ACTIVE',
        budget: 500,
        reach: 10000
      },
      {
        id: '2',
        name: 'Summer Sale',
        status: 'PAUSED',
        budget: 1000,
        reach: 25000
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateCampaign = () => {
    // This would integrate with the Facebook Marketing API
    console.log('Creating new campaign');
  };

  const handlePauseCampaign = (campaignId: string) => {
    // This would call the Facebook Marketing API to pause the campaign
    console.log('Pausing campaign:', campaignId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Facebook Ads Manager</h2>
        <button
          onClick={handleCreateCampaign}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
          <DollarSign className="h-8 w-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Spend</h3>
          <p className="text-3xl font-bold">$1,500</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
          <Users className="h-8 w-8 text-green-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Reach</h3>
          <p className="text-3xl font-bold">35,000</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
          <BarChart3 className="h-8 w-8 text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
          <p className="text-3xl font-bold">{campaigns.filter(c => c.status === 'ACTIVE').length}</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Campaign Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Campaign Name</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Budget</th>
                  <th className="text-left py-3 px-4">Reach</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-white/10">
                    <td className="py-3 px-4">{campaign.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">${campaign.budget}</td>
                    <td className="py-3 px-4">{campaign.reach.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handlePauseCampaign(campaign.id)}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        {campaign.status === 'ACTIVE' ? 'Pause' : 'Resume'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookAdsManager;