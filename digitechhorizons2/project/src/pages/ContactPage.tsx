import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, Shield } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    siteName: '',
    email: '',
    phone: '',
    protectionDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/digitechwebdeveloper@gmail.com', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        siteName: '',
        email: '',
        phone: '',
        protectionDetails: '',
      });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Shield className="mx-auto h-12 w-12 text-blue-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-white">Protect Your Content</h1>
          <p className="text-xl text-gray-300">
            Tell us about your content protection needs
          </p>
        </motion.div>

        {isSubmitted ? (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block p-4 rounded-full bg-green-500/20 mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-white">Thank You!</h2>
            <p className="text-gray-300">
              We've received your request and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-2">
                  Website/Brand Name *
                </label>
                <input
                  id="siteName"
                  name="siteName"
                  type="text"
                  required
                  value={formData.siteName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <PhoneInput
                    country={'us'}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                    inputClass="!w-full !px-12 !py-3 !bg-white/5 !border !border-white/10 !rounded-lg !text-white"
                    buttonClass="!bg-white/5 !border !border-white/10"
                    dropdownClass="!bg-slate-800 !text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="protectionDetails" className="block text-sm font-medium text-gray-300 mb-2">
                  What content needs protection? *
                </label>
                <textarea
                  id="protectionDetails"
                  name="protectionDetails"
                  required
                  value={formData.protectionDetails}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please describe the content you need to protect (e.g., website content, videos, images, software) and any specific concerns about piracy or unauthorized use."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;