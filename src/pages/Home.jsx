import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Shield, Award, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { useQuoteModal } from '@/context/QuoteModalContext';
const Home = () => {
  const {
    openModal
  } = useQuoteModal();
  const destinations = [{
    name: 'Sikkim',
    description: 'Explore pristine mountains, monasteries, and vibrant culture',
    image: 'Scenic mountain landscape of Sikkim with snow-capped peaks and green valleys'
  }, {
    name: 'Darjeeling',
    description: 'Experience tea gardens, colonial charm, and Himalayan views',
    image: 'Beautiful tea plantations in Darjeeling with mountain backdrop'
  }, {
    name: 'Bhutan',
    description: 'Discover the Land of Thunder Dragon and ancient traditions',
    image: 'Iconic Tigers Nest monastery in Bhutan perched on cliff'
  }, {
    name: 'Northeast India',
    description: 'Uncover hidden gems and diverse tribal cultures',
    image: 'Lush green hills and valleys of Northeast India with traditional villages'
  }, {
    name: 'Nepal',
    description: 'Trek through Himalayas and visit sacred temples',
    image: 'Majestic Himalayan peaks in Nepal with prayer flags'
  }];
  const whyChoose = [{
    icon: <Shield className="w-8 h-8" />,
    title: 'Verified Hotels',
    description: 'Stay in handpicked, quality-assured accommodations'
  }, {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Transparent Pricing',
    description: 'No hidden costs, what you see is what you pay'
  }, {
    icon: <Users className="w-8 h-8" />,
    title: 'Local Experts',
    description: 'Guided by knowledgeable local professionals'
  }, {
    icon: <Award className="w-8 h-8" />,
    title: '24×7 Support',
    description: 'Round-the-clock assistance throughout your journey'
  }];
  const packages = [{
    title: 'Adventure Tours',
    description: 'Thrilling treks, rafting, and mountain expeditions',
    icon: <TrendingUp className="w-6 h-6" />
  }, {
    title: 'Cultural Tours',
    description: 'Immerse in local traditions and heritage sites',
    icon: <Star className="w-6 h-6" />
  }, {
    title: 'Family Packages',
    description: 'Safe, comfortable trips for the whole family',
    icon: <Users className="w-6 h-6" />
  }, {
    title: 'Honeymoon Specials',
    description: 'Romantic getaways in breathtaking locations',
    icon: <Calendar className="w-6 h-6" />
  }];
  const trustPoints = ['500+ Happy Travelers', '50+ Destinations Covered', '10+ Years of Excellence', '100% Customer Satisfaction'];
  return <>
      <Helmet>
        <title>AsianTrips - Plan Your Perfect Trip Without Worries | Premium Travel Experiences</title>
        <meta name="description" content="Plan your perfect trip to Sikkim, Darjeeling, Bhutan, Northeast India, and Nepal with AsianTrips. Verified hotels, transparent pricing, local experts, and 24×7 support." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="mb-12">
              <AsianTripsLogo type="full" className="mx-auto scale-110 md:scale-125 text-white [&_.logo-text]:text-white [&_.logo-tagline]:text-blue-100" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Plan Your Perfect Trip
              <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mt-2">
                Without Worries
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-8">
              No False Promises • No Hidden Costs • Real Support
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>Verified Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>Local Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>24×7 Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={openModal} size="lg" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white text-lg px-8 py-6 shadow-xl">
                Get Free Quote
              </Button>
              <Link to="/packages">
                <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-6 border-2 border-white shadow-xl w-full sm:w-auto">
                  Explore Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Amazing Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the beauty and culture of Asia's most stunning locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => <motion.div key={destination.name} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img alt={destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://horizons-cdn.hostinger.com/82871eb4-d506-4da4-acd2-e5a1918556e3/3-1-M82Wr.jpg" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-2xl font-bold">{destination.name}</span>
                  </div>
                  <p className="text-gray-200 text-sm">{destination.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Why Choose AsianTrips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AsianTrips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, index) => <motion.div key={item.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-full mb-4">
                  {item.icon}
                </div>
                <span className="text-xl font-bold text-gray-900 mb-2 block">{item.title}</span>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Choose from our curated selection of tour packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => <motion.div key={pkg.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20 cursor-pointer">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-lg mb-4">
                  {pkg.icon}
                </div>
                <span className="text-xl font-bold mb-2 block">{pkg.title}</span>
                <p className="text-blue-200 text-sm">{pkg.description}</p>
              </motion.div>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/packages">
              <Button size="lg" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Travel With Confidence */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel With Confidence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              No False Promises • No Hidden Costs • Real Support
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {trustPoints.map((point, index) => <motion.div key={point} initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-orange-500 bg-clip-text text-transparent mb-2">
                    {point.split(' ')[0]}
                  </div>
                  <p className="text-gray-600 text-sm">{point.split(' ').slice(1).join(' ')}</p>
                </motion.div>)}
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
                Get in touch with us today and let our experts plan your perfect getaway
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={openModal} size="lg" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8">
                  Get Free Quote
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50 px-8 w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>;
};
export default Home;