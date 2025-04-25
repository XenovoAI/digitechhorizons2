import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Target,
  Users,
  BarChart3,
  Settings,
  Image as ImageIcon,
  Type,
  Globe,
  ChevronDown,
  CheckCircle2,
  DollarSign,
  Zap,
  Eye
} from 'lucide-react';
import { trackViewContent, trackCustomEvent } from '../../lib/metaPixel';

const MetaAdsSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showAudienceSettings, setShowAudienceSettings] = useState(false);
  const [adBudget, setAdBudget] = useState('500');
  const [adDuration, setAdDuration] = useState('30');

  useEffect(() => {
    // Track page view when component mounts
    trackViewContent({
      content_name: 'Meta Ads Configuration',
      content_category: 'Marketing',
    });
  }, []);

  const platforms = [
    { id: 'facebook-feed', name: 'Facebook News Feed', icon: Facebook },
    { id: 'facebook-marketplace', name: 'Facebook Marketplace', icon: Globe },
    { id: 'instagram-feed', name: 'Instagram Feed', icon: Instagram },
    { id: 'instagram-stories', name: 'Instagram Stories', icon: Instagram },
    { id: 'instagram-reels', name: 'Instagram Reels', icon: Instagram }
  ];

  const audienceParameters = [
    {
      title: 'Demographics',
      options: ['Age: 25-54', 'Gender: All', 'Location: United States']
    },
    {
      title: 'Interests',
      options: ['Technology', 'Digital Security', 'Business Software']
    },
    {
      title: 'Behaviors',
      options: ['Online Buyers', 'Tech Early Adopters', 'Business Decision-Makers']
    }
  ];

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    trackCustomEvent('PlatformSelected', {
      platform: platformId,
      budget: adBudget,
      duration: adDuration
    });
  };

  const handleCreateCampaign = () => {
    trackCustomEvent('CampaignCreated', {
      platform: selectedPlatform,
      budget: adBudget,
      duration: adDuration,
      audience: showAudienceSettings
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Meta Advertising Campaign
          </motion.h2>
          <p className="text-gray-300">Launch your campaign across Facebook and Instagram</p>
        </div>

        {/* Campaign Budget */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <DollarSign className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Campaign Budget</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Daily Budget (USD)
              </label>
              <input
                type="number"
                value={adBudget}
                onChange={(e) => setAdBudget(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                min="5"
                step="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Duration (Days)
              </label>
              <input
                type="number"
                value={adDuration}
                onChange={(e) => setAdDuration(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                min="1"
                max="90"
              />
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
            <p className="text-blue-400">
              Estimated Total Budget: ${Number(adBudget) * Number(adDuration)}
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                selectedPlatform === platform.id
                  ? 'bg-blue-600 border-blue-400'
                  : 'bg-white/5 border-white/10 hover:border-blue-400/50'
              }`}
              onClick={() => handlePlatformSelect(platform.id)}
            >
              <div className="flex items-center gap-4">
                <platform.icon className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">{platform.name}</h3>
                  <p className="text-sm text-gray-300">Recommended Format</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ad Preview */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Ad Preview</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Image Requirements:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Square: 1080 x 1080px</li>
                  <li>• Landscape: 1200 x 628px</li>
                  <li>• File type: JPG or PNG</li>
                  <li>• Max file size: 30MB</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Text (125 characters max)
                  </label>
                  <textarea
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    maxLength={125}
                    placeholder="Enter your ad text here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Headline (40 characters max)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    maxLength={40}
                    placeholder="Enter headline..."
                  />
                </div>
              </div>
              <button 
                onClick={handleCreateCampaign}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Audience Targeting */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-12">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowAudienceSettings(!showAudienceSettings)}
          >
            <div className="flex items-center gap-4">
              <Target className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Audience Targeting</h3>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-gray-400 transition-transform ${
                showAudienceSettings ? 'transform rotate-180' : ''
              }`}
            />
          </div>

          {showAudienceSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 grid md:grid-cols-3 gap-6"
            >
              {audienceParameters.map((param, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-medium text-white">{param.title}</h4>
                  <ul className="space-y-2">
                    {param.options.map((option, optIndex) => (
                      <li key={optIndex} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Campaign Performance Metrics */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-4 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Estimated Performance</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Estimated Reach</span>
              </div>
              <p className="text-2xl font-bold text-white">50K - 150K</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Estimated Clicks</span>
              </div>
              <p className="text-2xl font-bold text-white">1K - 3K</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Estimated CPC</span>
              </div>
              <p className="text-2xl font-bold text-white">$0.50 - $2.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaAdsSection;