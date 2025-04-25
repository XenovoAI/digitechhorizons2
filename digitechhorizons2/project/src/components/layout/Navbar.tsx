import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ContactPage from '../../pages/ContactPage';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { session, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactOpen]);

  const navigationItems = [
    { name: 'Services', path: '/#services' },
    { name: 'Features', path: '/#features' },
    { name: 'Developers', path: '/developers' },
    { name: 'About', path: '/about' }
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        window.location.href = `/${path}`;
      } else {
        const element = document.querySelector(path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const ContactModal = () => (
    <AnimatePresence>
      {isContactOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setIsContactOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="fixed inset-4 md:inset-10 z-50 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-blue-900 shadow-2xl md:mx-auto md:max-w-4xl"
          >
            <div className="relative h-full overflow-auto">
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>
              <ContactPage />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <ContactModal />
      <header 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 py-2 min-h-[48px]"
              aria-label="Home"
            >
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-lg md:text-xl text-white">Digitech Horizons</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex gap-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="text-gray-300 hover:text-blue-400 transition-colors py-2 px-3 rounded-lg min-h-[48px] flex items-center"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex gap-3">
                {session ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="px-6 py-3 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-colors min-h-[48px] flex items-center justify-center"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors min-h-[48px]"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="px-6 py-3 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-colors min-h-[48px] flex items-center justify-center"
                    >
                      Login
                    </Link>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors min-h-[48px] flex items-center justify-center"
                    >
                      Contact Us
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <button 
              className="md:hidden p-3 text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-[64px] bg-slate-900/95 backdrop-blur-lg border-t border-white/10 max-h-[calc(100vh-64px)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="text-gray-300 hover:text-blue-400 transition-colors py-4 px-4 rounded-lg min-h-[48px] flex items-center"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4">
                    {session ? (
                      <>
                        <Link 
                          to="/dashboard" 
                          className="w-full px-6 py-4 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-colors min-h-[48px] flex items-center justify-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button 
                          onClick={() => {
                            signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full px-6 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors min-h-[48px]"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="w-full px-6 py-4 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-colors min-h-[48px] flex items-center justify-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <button
                          onClick={() => {
                            setIsContactOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full px-6 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors min-h-[48px] flex items-center justify-center"
                        >
                          Contact Us
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;