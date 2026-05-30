import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Mountain, Coffee, Building, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import AsianTripsLogo from '@/components/AsianTripsLogo'; // Import the new logo component

const Destinations = () => {
  const { toast } = useToast();

  const destinations = [
    {
      name: 'Sikkim',
      description: 'A paradise of pristine mountains, ancient monasteries, and vibrant Buddhist culture. Experience the magic of North East India\'s crown jewel.',
      image: 'Stunning panoramic view of Sikkim Himalayas with snow peaks and green valleys',
      highlights: ['Tsomgo Lake', 'Nathula Pass', 'Rumtek Monastery', 'Pelling'],
      bestTime: 'March to May, October to December',
      icon: <Mountain className="w-6 h-6" />
    },
    {
      name: 'Darjeeling',
      description: 'The Queen of Hills offers colonial charm, sprawling tea gardens, and breathtaking views of Kanchenjunga.',
      image: 'Iconic Darjeeling tea gardens with mountain backdrop and toy train',
      highlights: ['Tiger Hill', 'Toy Train', 'Tea Gardens', 'Mall Road'],
      bestTime: 'April to June, September to November',
      icon: <Coffee className="w-6 h-6" />
    },
    {
      name: 'Bhutan',
      description: 'The Land of Thunder Dragon beckons with its untouched beauty, ancient dzongs, and unique Gross National Happiness philosophy.',
      image: 'Tigers Nest monastery Bhutan perched dramatically on cliff face',
      highlights: ['Tigers Nest', 'Punakha Dzong', 'Thimphu', 'Paro Valley'],
      bestTime: 'March to May, September to November',
      icon: <Building className="w-6 h-6" />
    },
    {
      name: 'Northeast India',
      description: 'Explore India\'s hidden paradise with diverse cultures, pristine landscapes, and warm hospitality across seven sister states.',
      image: 'Beautiful landscapes of Northeast India with tribal villages and hills',
      highlights: ['Tawang', 'Shillong', 'Kaziranga', 'Meghalaya'],
      bestTime: 'October to April',
      icon: <Compass className="w-6 h-6" />
    },
    {
      name: 'Nepal',
      description: 'Home to the mighty Himalayas, ancient temples, and spiritual enlightenment. Trek through legendary mountain trails.',
      image: 'Majestic Mount Everest and Himalayas in Nepal with prayer flags',
      highlights: ['Kathmandu', 'Pokhara', 'Everest Base Camp', 'Chitwan'],
      bestTime: 'September to November, March to May',
      icon: <Mountain className="w-6 h-6" />
    }
  ];

  const handleExploreClick = (destination) => {
    toast({
      title: `Explore ${destination}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Destinations - AsianTrips | Explore Sikkim, Darjeeling, Bhutan & More</title>
        <meta name="description" content="Discover amazing destinations with AsianTrips. Explore Sikkim, Darjeeling, Bhutan, Northeast India, and Nepal with expert local guides and premium travel experiences." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Destinations</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover the beauty and diversity of Asia's most spectacular locations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={`aspect-[4/3] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <img alt={destination.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>

                <div className={`p-8 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-full flex items-center justify-center">
                      {destination.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{destination.name}</h2>
                  </div>

                  <p className="text-gray-600 mb-6">{destination.description}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-900">Top Attractions</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-900">Best Time to Visit:</span>
                      <span className="text-gray-600">{destination.bestTime}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleExploreClick(destination.name)}
                    className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white"
                  >
                    Explore {destination.name}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Let us help you plan the perfect journey to your dream destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => toast({
                  title: "Get Your Free Quote",
                  description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                })}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8"
              >
                Get Free Quote
              </Button>
              <a href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Destinations;