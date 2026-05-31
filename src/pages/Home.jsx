import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Shield, Award, CheckCircle, Star, TrendingUp, Clock, Compass, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { useQuoteModal } from '@/context/QuoteModalContext';

const Home = () => {
  const { openModal } = useQuoteModal();

  // Detailed Data jaisa Destinations page par hai
  const destinations = [
    {
      name: 'Northeast India',
      description: 'Discover the hidden paradise of Northeast India with breathtaking mountains, crystal-clear rivers, waterfalls, tribal culture, wildlife and unforgettable Himalayan landscapes.',
      image: 'https://images.unsplash.com/photo-1629225721869-7ee429d2f627?auto=format&fit=crop&q=80',
      bestTime: 'October to April',
      tags: ['State Lake', 'Living Root Bridge', 'Cherrapunji'],
      locations: ['Meghalaya', 'Arunachal Pradesh', 'Nagaland'],
      link: '/destinations/northeast-india'
    },
    {
      name: 'Nepal',
      description: 'Explore the breathtaking beauty of Nepal with majestic Himalayan peaks, ancient temples, adventure activities and unforgettable cultural experiences.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80',
      bestTime: 'March to May and September to December',
      tags: ['Mount Everest View', 'Pokhara', 'Phewa Lake'],
      locations: ['Kathmandu', 'Pokhara', 'Nagarkot'],
      link: '/destinations/nepal'
    },
    {
      name: 'Bhutan',
      description: 'Experience the Land of Happiness with stunning monasteries, Himalayan landscapes, rich culture and vibrant traditions.',
      image: 'https://images.unsplash.com/photo-1574768390632-1bde9b9a6b18?auto=format&fit=crop&q=80',
      bestTime: 'March to May and September to November',
      tags: ['Tiger\'s Nest', 'Paro', 'Thimphu'],
      locations: ['Paro', 'Thimphu', 'Punakha'],
      link: '/destinations/bhutan'
    },
    {
      name: 'Sikkim',
      description: 'A Himalayan paradise blessed with snow-capped mountains, crystal clear lakes, ancient monasteries, adventure trails and breathtaking landscapes.',
      image: 'https://images.unsplash.com/photo-1544634076-a900ce0ed528?auto=format&fit=crop&q=80',
      bestTime: 'March to June & October to December',
      tags: ['Gurudongmar Lake', 'Tsomgo Lake', 'Nathula Pass'],
      locations: ['Gangtok', 'North Sikkim', 'Pelling'],
      link: '/destinations/sikkim'
    }
  ];

  const whyChoose = [
    { icon: <Shield className="w-8 h-8" />, title: 'Verified Hotels', description: 'Stay in handpicked, quality-assured accommodations' },
    { icon: <CheckCircle className="w-8 h-8" />, title: 'Transparent Pricing', description: 'No hidden costs, what you see is what you pay' },
    { icon: <Users className="w-8 h-8" />, title: 'Local Experts', description: 'Guided by knowledgeable local professionals' },
    { icon: <Award className="w-8 h-8" />, title: '24×7 Support', description: 'Round-the-clock assistance throughout your journey' }
  ];

  const packages = [
    { title: 'Adventure Tours', description: 'Thrilling treks, rafting, and mountain expeditions', icon: <TrendingUp className="w-6 h-6" /> },
    { title: 'Cultural Tours', description: 'Immerse in local traditions and heritage sites', icon: <Star className="w-6 h-6" /> },
    { title: 'Family Packages', description: 'Safe, comfortable trips for the whole family', icon: <Users className="w-6 h-6" /> },
    { title: 'Honeymoon Specials', description: 'Romantic getaways in breathtaking locations', icon: <Calendar className="w-6 h-6" /> }
  ];

  const trustPoints = ['500000+ Happy Travelers', '50+ Destinations Covered', '10+ Years of Excellence', '100% Customer Satisfaction'];

  return (
    <>
      <Helmet>
        <title>AsianTrips - Plan Your Perfect Trip Without Worries</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <AsianTripsLogo type="full" className="mx-auto scale-110 md:scale-125 mb-12 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Plan Your Perfect Trip <span className="text-orange-400">Without Worries</span></h1>
            <p className="text-xl mb-8">No False Promises • No Hidden Costs • Real Support</p>
            <div className="flex justify-center gap-4">
              <Button onClick={openModal} className="bg-orange-500 text-white px-8 py-6 text-lg">Get Free Quote</Button>
              <Link to="/packages"><Button variant="outline" className="bg-white text-blue-900 px-8 py-6 text-lg">Explore Packages</Button></Link>
            </div>
        </div>
      </section>

      {/* Explore Amazing Destinations Section (NEW DESIGN) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Amazing Destinations</h2>
            <p className="text-gray-600">Discover the beauty and culture of Asia's most stunning locations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest, index) => (
              <motion.div 
                key={dest.name} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="h-64 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{dest.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{dest.description}</p>
                  
                  {/* Best Time */}
                  <div className="flex items-start gap-3 mb-6">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Best time:</span> {dest.bestTime}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {dest.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs font-medium text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        <Compass className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Locations */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 border-t pt-6 border-gray-100">
                    {dest.locations.map(loc => (
                      <div key={loc} className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-orange-500" /> {loc}
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={dest.link}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-200">
                      Explore {dest.name}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose & Footer Sections remain same... */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose AsianTrips</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {whyChoose.map(item => (
                    <div key={item.title} className="p-6 rounded-xl bg-blue-50">
                        <div className="inline-block p-4 bg-blue-900 text-white rounded-full mb-4">{item.icon}</div>
                        <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
