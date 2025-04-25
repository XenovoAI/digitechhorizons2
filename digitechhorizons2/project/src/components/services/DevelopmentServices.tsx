import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, 
  Smartphone, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Rocket,
  PenTool,
  Timer,
  Zap,
  Globe,
  Server,
  Bot,
  Coffee,
  Laptop,
  Phone,
  Braces,
  GitBranch
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DevelopmentServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Development",
      description: "Modern, responsive websites built with:",
      features: [
        "React/Next.js",
        "WordPress/Shopify",
        "24-hour landing page delivery"
      ],
      type: "web"
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: "App Development",
      description: "Cross-platform mobile apps using:",
      features: [
        "Flutter/React Native",
        "Firebase backend",
        "App Store optimization"
      ],
      type: "app"
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Custom Solutions",
      description: "Tailored business tools:",
      features: [
        "SaaS platforms",
        "AI integrations",
        "Database systems"
      ],
      type: "custom"
    }
  ];

  const process = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Consultation",
      description: "Free 30-minute discovery call"
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Prototyping",
      description: "Interactive Figma mockups"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Development",
      description: "Agile sprints with weekly updates"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch",
      description: "Deployment + 1-month free support"
    }
  ];

  const portfolio = [
    {
      title: "E-commerce Platform",
      description: "Result: Increased conversions by 120% for TechGear",
      image: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg",
      type: "web"
    },
    {
      title: "Fitness Tracking App",
      description: "Result: 50,000+ downloads in first month",
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
      type: "app"
    },
    {
      title: "AI-Powered CRM",
      description: "Result: 85% reduction in manual data entry",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
      type: "custom"
    }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Dream Website with Expert Developers
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              From sleek portfolios to powerful e-commerce platforms – we turn ideas into reality.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Development Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10"
              >
                <div className="text-blue-400 mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Our Development Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <div className="text-blue-400 mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-blue-600/20 transform translate-x-1/2">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Success Stories
            </h2>
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-blue-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'web'
                    ? 'bg-blue-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setActiveFilter('app')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'app'
                    ? 'bg-blue-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Mobile
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio
              .filter(project => activeFilter === 'all' || project.type === activeFilter)
              .map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Trusted by 50+ Startups
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center"
            >
              <Braces className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Code Ownership</h3>
              <p>Full rights to your source code</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center"
            >
              <Timer className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">On-Time Delivery</h3>
              <p>Meeting deadlines consistently</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center"
            >
              <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p>Always here when you need us</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Got an idea? Let's build it together</p>
            <Link
              to="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentServices;