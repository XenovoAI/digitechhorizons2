import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Brain, Users, CheckCircle2, Globe2, Lock, Trophy, GraduationCap, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const achievements = [
    {
      stat: '250,000+',
      label: 'Pirated Links Removed',
      description: 'Using our AI-powered detection system'
    },
    {
      stat: '$2B+',
      label: 'Client IP Value Protected',
      description: 'Through proactive monitoring and rapid response'
    },
    {
      stat: '98%',
      label: 'Takedown Success Rate',
      description: 'With our automated DMCA system'
    }
  ];

  const values = [
    {
      icon: <Brain className="w-12 h-12 text-blue-400" />,
      title: 'Innovation First',
      description: 'Our AI detection system is 3x faster than industry standards, powering our instant takedown service'
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: 'Complete Protection',
      description: 'Combining automated monitoring with expert legal review for comprehensive content security'
    },
    {
      icon: <Users className="w-12 h-12 text-blue-400" />,
      title: 'Client Success',
      description: 'We partner with creators to prevent piracy, not just react to it, supporting our monitoring services'
    }
  ];

  const founderAchievements = [
    {
      icon: <Trophy className="w-6 h-6 text-blue-400" />,
      title: "Finalist in 'Kaun Banega Nanha Kalam'",
      description: "State Level Achievement"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: "National Champion",
      description: "'Bharat ko Jaano' Competition"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
      title: "90% Question-Prediction Accuracy",
      description: "ExamFusion Algorithm Developer"
    },
    {
      icon: <Globe2 className="w-6 h-6 text-blue-400" />,
      title: "UN State Youth Representative",
      description: "India's Delegate to the United Nations"
    }
  ];

  const cfoAchievements = [
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
      title: "IIT Double Graduate",
      description: "BTech & MTech in CS/AI"
    },
    {
      icon: <Trophy className="w-6 h-6 text-blue-400" />,
      title: "Microsoft Leadership",
      description: "Led Azure AI Design Team"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: "McKinsey Consultant",
      description: "Fortune 500 Tech Advisor"
    },
    {
      icon: <Globe2 className="w-6 h-6 text-blue-400" />,
      title: "Successful Exit",
      description: "$350M Fintech Acquisition"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        {/* Mission Statement */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Protecting Digital Innovation</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At Digitech Horizons, we combine cutting-edge AI technology with legal expertise to create a shield between creators and digital piracy. Our mission is to ensure that innovators can focus on creation, not content protection.
          </p>
        </motion.div>

        {/* Founder's Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Meet Our Founder</h3>
              <h4 className="text-xl font-semibold mb-2 text-blue-400">Raj Mishra</h4>
              <p className="text-gray-300 mb-4">
                Academic Prodigy & Education Innovator
              </p>
              <p className="text-gray-300 mb-6">
                Born from Raj's pandemic-era observation of educational inequity, ExamFusion merges his academic prowess with a mission: "To democratize exam preparation — no student left behind."
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Precision – Research-backed question prediction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Accessibility – Zero-cost resources for underserved students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Impact – Bridging the pandemic-induced learning gap</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {founderAchievements.map((achievement, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    {achievement.icon}
                    <div>
                      <h5 className="font-semibold text-white">{achievement.title}</h5>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CFO Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Meet Our CFO</h3>
              <h4 className="text-xl font-semibold mb-2 text-blue-400">Rishabh Dubey</h4>
              <p className="text-gray-300 mb-4">
                Financial Strategist & Tech Innovator
              </p>
              <p className="text-gray-300 mb-6">
                A visionary leader with a unique blend of technical expertise and financial acumen, Rishabh brings invaluable experience from top-tier tech companies and consulting firms to drive our financial strategy and growth.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Strategy – Data-driven financial planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Innovation – Tech-first approach to finance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Growth – Scaling through strategic investments</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {cfoAchievements.map((achievement, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    {achievement.icon}
                    <div>
                      <h5 className="font-semibold text-white">{achievement.title}</h5>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Track Record */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Impact</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{achievement.stat}</div>
                <p className="text-white font-semibold mb-2">{achievement.label}</p>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Comprehensive Protection Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Globe2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">Global Monitoring</h4>
              <p className="text-gray-300">24/7 scanning across the web for unauthorized content distribution</p>
              <Link to="/services" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Learn More →</Link>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">Instant Takedowns</h4>
              <p className="text-gray-300">Automated DMCA notices and rapid content removal system</p>
              <Link to="/services" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Learn More →</Link>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">Legal Protection</h4>
              <p className="text-gray-300">Expert legal team backing our automated protection systems</p>
              <Link to="/services" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Learn More →</Link>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Protect Your Content?</h3>
            <p className="text-gray-300 mb-6">Join thousands of creators who trust us with their digital assets</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors text-white"
              >
                Explore Services
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;