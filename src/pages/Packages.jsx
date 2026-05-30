import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, Star, TrendingUp, Heart, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import AsianTripsLogo from '@/components/AsianTripsLogo'; // Import the new logo component

const Packages = () => {
  const { toast } = useToast();

  const packageCategories = [
    {
      title: 'Adventure Tours',
      description: 'For thrill-seekers and nature enthusiasts',
      icon: <TrendingUp className="w-8 h-8" />,
      packages: [
        {
          name: 'Sikkim Adventure Trek',
          duration: '7 Days / 6 Nights',
          destinations: 'Gangtok, Lachen, Lachung',
          price: 'Starting from ₹25,000',
          image: 'Adventure trekking in Sikkim mountains with trekkers on trail',
          features: ['Trekking', 'Mountain Views', 'Local Cuisine', 'Expert Guide']
        },
        {
          name: 'Bhutan Mountain Expedition',
          duration: '10 Days / 9 Nights',
          destinations: 'Paro, Thimphu, Punakha, Bumthang',
          price: 'Starting from ₹45,000',
          image: 'Mountain expedition in Bhutan with dramatic peaks',
          features: ['High Altitude Trek', 'Monastery Visits', 'Cultural Experience', 'Photography']
        }
      ]
    },
    {
      title: 'Cultural Tours',
      description: 'Immerse yourself in rich traditions and heritage',
      icon: <Star className="w-8 h-8" />,
      packages: [
        {
          name: 'Darjeeling Heritage Tour',
          duration: '5 Days / 4 Nights',
          destinations: 'Darjeeling, Kalimpong',
          price: 'Starting from ₹18,000',
          image: 'Colonial architecture and heritage buildings in Darjeeling',
          features: ['Toy Train Ride', 'Tea Garden Visit', 'Monastery Tour', 'Shopping']
        },
        {
          name: 'Northeast Cultural Journey',
          duration: '12 Days / 11 Nights',
          destinations: 'Assam, Meghalaya, Nagaland',
          price: 'Starting from ₹38,000',
          image: 'Tribal cultural festival in Northeast India with traditional dancers',
          features: ['Tribal Villages', 'Living Root Bridges', 'Wildlife Safari', 'Local Festivals']
        }
      ]
    },
    {
      title: 'Family Packages',
      description: 'Perfect for memorable family vacations',
      icon: <Users className="w-8 h-8" />,
      packages: [
        {
          name: 'Sikkim Family Delight',
          duration: '6 Days / 5 Nights',
          destinations: 'Gangtok, Pelling, Namchi',
          price: 'Starting from ₹22,000',
          image: 'Family enjoying cable car ride with mountain views in Sikkim',
          features: ['Kid-Friendly', 'Comfortable Hotels', 'Sightseeing', 'Local Cuisine']
        },
        {
          name: 'Nepal Family Adventure',
          duration: '8 Days / 7 Nights',
          destinations: 'Kathmandu, Pokhara, Chitwan',
          price: 'Starting from ₹30,000',
          image: 'Family watching sunrise over Himalayas in Nepal',
          features: ['Temple Tours', 'Lake Activities', 'Wildlife Safari', 'Cultural Shows']
        }
      ]
    },
    {
      title: 'Honeymoon Specials',
      description: 'Romantic getaways for couples',
      icon: <Heart className="w-8 h-8" />,
      packages: [
        {
          name: 'Bhutan Romantic Escape',
          duration: '6 Days / 5 Nights',
          destinations: 'Paro, Thimphu, Punakha',
          price: 'Starting from ₹55,000',
          image: 'Romantic couple overlooking mountain valley in Bhutan',
          features: ['Luxury Hotels', 'Candlelight Dinner', 'Spa Sessions', 'Private Tours']
        },
        {
          name: 'Darjeeling Honeymoon Package',
          duration: '5 Days / 4 Nights',
          destinations: 'Darjeeling, Mirik',
          price: 'Starting from ₹20,000',
          image: 'Couple enjoying tea in scenic Darjeeling with mountain backdrop',
          features: ['Premium Hotels', 'Couple Activities', 'Scenic Views', 'Special Meals']
        }
      ]
    }
  ];

  const handleBookNow = (packageName) => {
    toast({
      title: `Book ${packageName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Tour Packages - AsianTrips | Adventure, Cultural & Family Tours</title>
        <meta name="description" content="Explore our curated tour packages for Sikkim, Darjeeling, Bhutan, Northeast India, and Nepal. Adventure tours, cultural experiences, family packages, and honeymoon specials." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Tour Packages</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
              Carefully crafted experiences for every type of traveler
            </p>
            <p className="text-xl md:text-2xl text-orange-200 font-semibold max-w-3xl mx-auto">
              No False Promises • No Hidden Costs • Real Support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Categories */}
      {packageCategories.map((category, categoryIndex) => (
        <section key={category.title} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-full mb-4">
                {category.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {category.packages.map((pkg, pkgIndex) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pkgIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img alt={pkg.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1702567855965-176e97304a4b" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span>{pkg.destinations}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-blue-900">{pkg.price}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="text-sm font-semibold text-gray-900 mb-2 block">Package Includes:</span>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleBookNow(pkg.name)}
                      className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Custom Package CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-full mb-6">
              <Compass className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Package?</h2>
            <p className="text-blue-200 text-lg mb-8">
              Don't see what you're looking for? We can create a personalized itinerary just for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => toast({
                  title: "Custom Package Request",
                  description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                })}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8"
              >
                Request Custom Package
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

export default Packages;