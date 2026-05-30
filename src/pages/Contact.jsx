import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, ShieldCheck, CheckCircle2, UserCheck, Banknote } from 'lucide-react';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

const Contact = () => {

  const reassurances = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      title: "No Fake Reviews",
      description: "We rely on genuine experiences, not bots."
    },
    {
      icon: <Banknote className="w-6 h-6 text-green-600" />,
      title: "No Hidden Costs",
      description: "Transparent pricing from day one."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Verified Hotels",
      description: "We personally inspect where you stay."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      title: "Personal Guidance",
      description: "Real experts planning your trip, not algorithms."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact AsianTrips | Honest Travel Guidance & Free Advice</title>
        <meta name="description" content="Talk to a real travel expert at AsianTrips. honest guidance for Sikkim, Darjeeling, Bhutan, and Northeast India. Call +91 9933649669 for free trip advice." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Plan Your Trip, The Right Way</h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-8">
              Talk to a real travel expert for <span className="text-orange-400 font-medium">honest guidance</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Direct Contact & Reassurance */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Direct Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach a Human Directly</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Call Us Anytime</p>
                      <a href="tel:+919933649669" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors block">
                        +91 9933649669
                      </a>
                      <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available now
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">WhatsApp Us</p>
                      <a 
                        href="https://wa.me/919933649669" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Fastest way to get details & quotes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Us</p>
                      <a href="mailto:info@asiantrips.com" className="text-lg font-medium text-gray-900 hover:text-blue-900 transition-colors">
                        info@asiantrips.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reassurance Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {reassurances.map((item, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="mb-3 bg-green-50 w-fit p-2 rounded-lg">{item.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border-t-4 border-blue-900"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Free Trip Advice</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you with a personalized plan. No pressure, just honest advice.
                </p>
              </div>

              {/* Reusing the QuoteForm Component */}
              <QuoteForm />
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="bg-blue-950 py-12 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl text-blue-100 font-serif italic">
            "AsianTrips — Honest Travel Planning You Can Rely On"
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;