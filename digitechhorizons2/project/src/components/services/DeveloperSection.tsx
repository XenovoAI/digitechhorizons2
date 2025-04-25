import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Terminal, Database, Cloud, Cpu, Globe, Shield, Zap } from 'lucide-react';

interface DeveloperSectionProps {
  onContactClick?: () => void;
}

const DeveloperSection = ({ onContactClick }: DeveloperSectionProps) => {
  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "API Integration",
      description: "RESTful APIs with comprehensive documentation and SDKs"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "CLI Tools",
      description: "Command-line interface for automated content protection"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Access",
      description: "Secure access to content protection analytics and reports"
    }
  ];

  const tools = [
    {
      name: "Content Protection SDK",
      description: "Integrate our protection system directly into your applications",
      features: [
        "Cross-platform support",
        "Real-time monitoring",
        "Automated takedown requests"
      ]
    },
    {
      name: "Analytics API",
      description: "Access detailed analytics about your protected content",
      features: [
        "Custom reporting",
        "Data visualization",
        "Trend analysis"
      ]
    },
    {
      name: "Webhook Integration",
      description: "Real-time notifications for content protection events",
      features: [
        "Customizable triggers",
        "Secure delivery",
        "Retry mechanism"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Developer Resources
          </h1>
          <p className="text-xl text-white mb-8">
            Integrate powerful content protection directly into your applications with our comprehensive developer tools and APIs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onContactClick}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2"
            >
              <Terminal className="w-5 h-5" />
              Get API Access
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Development Tools</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">{tool.name}</h3>
              <p className="text-white mb-6">{tool.description}</p>
              <ul className="space-y-3">
                {tool.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-white">
                    <Shield className="w-4 h-4 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Supported Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-white">
              <Cloud className="w-6 h-6 text-blue-400" />
              <span>Cloud Services</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Cpu className="w-6 h-6 text-blue-400" />
              <span>Edge Computing</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Globe className="w-6 h-6 text-blue-400" />
              <span>Global CDN</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Zap className="w-6 h-6 text-blue-400" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperSection;