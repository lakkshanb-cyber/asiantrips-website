import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Phone, 
  Search, 
  FileText, 
  HeartHandshake, 
  Map, 
  XCircle, 
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const About = () => {
  const processSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "1. We Listen First",
      description: "You talk to a real expert, not a sales script. We understand your preferences, budget, and travel style for Sikkim, Darjeeling, or Bhutan."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "2. Transparent Itinerary",
      description: "We craft a detailed plan. No hidden costs, no vague 'similar hotels' promises. You see exactly what you pay for."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "3. Verified Bookings",
      description: "We book verified hotels and reliable drivers. We don't take chances with your comfort or safety."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "4. Real-Time Support",
      description: "From arrival to departure, you have a direct line to us. No call centers, just real support when you need it."
    }
  ];

  const comparisons = [
    {
      problem: "Fake Reviews & Misleading Photos",
      solution: "Verified, honest descriptions of hotels and locations."
    },
    {
      problem: "Hidden Costs & Surge Pricing",
      solution: "Upfront, all-inclusive pricing with zero surprises."
    },
    {
      problem: "Automated Chatbots & Unreachable Agents",
      solution: "Direct access to local experts (9933649669)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About AsianTrips | Honest Travel Planning for Sikkim, Darjeeling & Bhutan</title>
        <meta name="description" content="AsianTrips provides honest, transparent travel planning for Sikkim, Darjeeling, Bhutan, and Northeast India. No hidden costs, real support, and local expertise." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AsianTrips</h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-8">
              We are on a mission to bring <span className="font-semibold text-orange-400">honesty</span> and <span className="font-semibold text-orange-400">transparency</span> back to travel planning.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
               <span className="font-medium text-orange-200">No False Promises • No Hidden Costs • Real Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-blue-100 rounded-lg">
                    <Map className="w-6 h-6 text-blue-900" />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  AsianTrips is more than just a travel agency; we are your dedicated local partners in the Himalayas. Based in the heart of the region, we specialize in crafting authentic experiences for <strong>Sikkim, Darjeeling, Bhutan, and Northeast India</strong>.
                </p>
                <p>
                  In a world of automated bookings and impersonal service, we take a step back to focus on what matters: <strong>Human connection and local expertise.</strong>
                </p>
                <p>
                  Our mission is simple: to offer honest travel planning. We don't sell packages; we design journeys that respect your time, your money, and the local culture. When you travel with us, you aren't just a booking reference number—you are our guest.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-orange-400 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <img alt="AsianTrips local team planning a trip in Sikkim office" src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AsianTrips Exists */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why AsianTrips Exists</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We started AsianTrips to solve the problems that frustrate travelers the most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-red-500 mb-2 font-semibold">
                      <XCircle className="w-5 h-5" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-gray-600 text-lg">{item.problem}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-green-600 mb-2 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>The AsianTrips Promise</span>
                    </div>
                    <p className="text-gray-900 font-medium text-lg">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Plan Your Trip */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How We Plan Your Trip</h2>
               <p className="text-gray-600 mt-4 text-lg">Our transparent, step-by-step process designed for your peace of mind.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                     <div className="h-full bg-blue-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100">
                        <div className="w-14 h-14 bg-white text-blue-900 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                           {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
              <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
           </div>

           <div className="grid md:grid-cols-3 gap-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
              >
                 <HeartHandshake className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold mb-4">Unwavering Honesty</h3>
                 <p className="text-blue-100">
                    We tell you the truth about destinations, road conditions, and hotels. If a place isn't worth visiting, we will tell you. We value your trust over a quick sale.
                 </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
              >
                 <Search className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold mb-4">Total Transparency</h3>
                 <p className="text-blue-100">
                    No hidden taxes, no surprise fees, and no vague inclusions. Our quotes are detailed and clear, so you know exactly where every rupee goes.
                 </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
              >
                 <Users className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold mb-4">Real Human Support</h3>
                 <p className="text-blue-100">
                    Technology is great, but it can't fix a flat tire or a permit issue. Our team is available 24/7 to solve real-world problems for you instantly.
                 </p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Talk to a Real Expert */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100 shadow-sm text-center"
           >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Talk to a Real Travel Expert</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                 Tired of automated responses and call centers? Speak directly to someone who knows the mountains inside out.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                 <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-blue-900">
                    <Phone className="w-8 h-8 md:w-10 md:h-10" />
                    <a href="tel:9933649669" className="hover:text-blue-700 transition-colors">9933649669</a>
                 </div>
              </div>
              
              <div className="flex justify-center gap-4">
                 <a href="tel:9933649669">
                    <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8">
                       Call Now
                    </Button>
                 </a>
                 <a href="https://wa.me/919933649669" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8">
                       <MessageCircle className="w-4 h-4 mr-2" />
                       WhatsApp Us
                    </Button>
                 </a>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Final Trust CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for an Honest Travel Experience?</h2>
            <p className="text-gray-400 mb-8 text-lg">
               Let us plan a trip that exceeds your expectations, without the stress.
            </p>
            <Button 
               size="lg" 
               className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-10 py-6 text-lg shadow-xl"
               onClick={() => window.location.href = '/contact'}
            >
               Start Planning Your Trip
            </Button>
         </div>
      </section>

      <Footer />
    </>
  );
};

export default About;