import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Zap, 
  Lock, 
  BarChart3, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Target, 
  Rocket,
  FileWarning,
  Youtube,
  Search,
  Scale,
  ShieldCheck,
  Brain,
  Building2,
  Bot,
  MousePointerClick,
  Map,
  FileCheck,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const HomePage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { value: '98%', label: 'Content Protection Rate' },
    { value: '24/7', label: 'Monitoring Coverage' },
    { value: '15M+', label: 'Protected Assets' },
    { value: '1000+', label: 'Satisfied Clients' }
  ];

  const coreFeatures = [
    {
      icon: <Bot className="w-12 h-12" />,
      title: 'AI-Powered Piracy Detection',
      benefits: [
        '24/7 web scanning across torrents, streaming sites & social media using custom-trained algorithms',
        'Automatic fingerprint matching for videos, software, and eBooks'
      ]
    },
    {
      icon: <MousePointerClick className="w-12 h-12" />,
      title: 'Instant Takedown System',
      benefits: [
        'One-click DMCA submissions to Google/YouTube/ISPs',
        'Bulk takedown processing (1000+ URLs at once)'
      ]
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: 'Real-Time Monitoring Dashboard',
      benefits: [
        'Interactive threat map showing piracy hotspots',
        'Custom alerts (email/Slack) for new infringements'
      ]
    },
    {
      icon: <FileCheck className="w-12 h-12" />,
      title: 'Legal-Grade Evidence',
      benefits: [
        'Auto-generated takedown reports with timestamps & screenshots',
        'Court-ready documentation package'
      ]
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Enterprise API',
      benefits: [
        'REST API for integration with internal systems',
        'Webhook support for real-time piracy alerts'
      ]
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Advanced Protection',
      description: 'AI-powered content monitoring and protection across the web'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Takedowns',
      description: 'Automated DMCA notices and rapid content removal'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security for your digital assets'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Comprehensive reporting and protection metrics'
    }
  ];

  const process = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Identify Threats',
      description: 'Our AI system continuously scans the web for unauthorized use of your content'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Protect Content',
      description: 'Automated protection measures are deployed to secure your digital assets'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Take Action',
      description: 'Swift legal action and takedown notices are issued when violations are detected'
    }
  ];

  const services = [
    {
      icon: <FileWarning className="w-8 h-8" />,
      title: 'Automated DMCA Takedowns',
      description: 'Remove pirated content from Google, torrents, and illegal sites within 24 hours.'
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: 'YouTube & Social Media Protection',
      description: 'Block unauthorized uploads on YouTube, Facebook, Instagram, and TikTok.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Torrent & Streaming Site Monitoring',
      description: '24/7 tracking of piracy on platforms like Pirate Bay, 1337x, and illegal streaming hubs.'
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Legal Enforcement',
      description: 'Cease & desist notices, lawsuit support, and ISP blocking for repeat offenders.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Brand Protection',
      description: 'Combat counterfeit sales on Amazon/eBay and phishing domains.'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Piracy Detection',
      description: 'AI scans the web to auto-detect leaks (movies, software, music, eBooks).'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Custom Enterprise Solutions',
      description: 'Dedicated anti-piracy teams for studios and Fortune 500 companies.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Protect Your Digital Legacy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
              Advanced AI-powered protection for your intellectual property. Secure your content across the digital landscape.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-white"
              >
                Start Protection
              </Link>
              <Link
                to="/#features"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors text-white"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-slate-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Enterprise-Grade Protection Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology meets legal expertise in our comprehensive anti-piracy solution
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Trusted by 500+ Studios</p>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-white">GDPR Compliant</span>
                  <span className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-white">DMCA Certified</span>
                </div>
              </div>
            </div>
            <Link
              to="/register"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors whitespace-nowrap text-white"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive Anti-Piracy Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect your intellectual property with our advanced suite of anti-piracy solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mb-16">
            <div className="flex items-center gap-8 p-6 bg-blue-50 rounded-xl">
              <div className="flex gap-4">
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" alt="Trusted Company" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Trusted by 500+ Brands</p>
                  <p className="text-sm text-gray-600">Including Fortune 500 companies</p>
                </div>
              </div>
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={processRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              How We Protect Your Content
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-50 rounded-xl text-center"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Ready to secure your Digital Innovations?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
              Join thousands of businesses that trust us for their content protection needs.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;