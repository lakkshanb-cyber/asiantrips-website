import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Shield,
  Award,
  CheckCircle,
  Star
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { useQuoteModal } from '@/context/QuoteModalContext';
const destinations = [
  {
    name: 'Darjeeling',
    image: '/images/darjeeling-poster.jpg',
    link: '/destinations/darjeeling'
  },
  {
    name: 'Sikkim',
    image: '/images/sikkim-poster.jpg',
    link: '/destinations/sikkim'
  },
  {
    name: 'Nepal',
    image: '/images/nepal-poster.jpg',
    link: '/destinations/nepal'
  },
  {
    name: 'Bhutan',
    image: '/images/bhutan-poster.jpg',
    link: '/destinations/bhutan'
  },
  {
    name: 'Northeast India',
    image: '/images/northeast-poster.jpg',
    link: '/destinations/northeast-india'
  }
];
const whyChoose = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Verified Hotels',
    description: 'Stay in handpicked, quality-assured accommodations'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Transparent Pricing',
    description: 'No hidden costs, what you see is what you pay'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Local Experts',
    description: 'Guided by knowledgeable local professionals'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '24×7 Support',
    description: 'Round-the-clock assistance throughout your journey'
  }
];
const testimonials = [
  {
    name: 'Rahul Sharma',
    review:
      'Amazing Bhutan trip. Everything was perfectly managed from start to finish.'
  },
  {
    name: 'Priya Das',
    review:
      'Excellent Sikkim experience. Hotels, transport and support were outstanding.'
  },
  {
    name: 'Amit Roy',
    review:
      'Highly recommended for Northeast India tours. Very professional team.'
  }
];
const trustPoints = [
  '500+ Happy Travelers',
  '50+ Destinations',
  '10+ Years Experience',
  '24×7 Support'
];
{/* Hero Section */}
<section ... >
...
</section>
{/* Hero Section */}
<section
  className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url('/images/darjeeling-hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

    <AsianTripsLogo
      type="full"
      className="mx-auto scale-110 md:scale-125 mb-10 text-white"
    />

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-bold mb-6"
    >
      Explore The Himalayas
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-xl md:text-2xl text-gray-200 mb-8"
    >
      Sikkim • Darjeeling • Bhutan • Nepal • Northeast India
    </motion.p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
      <Button
        onClick={openModal}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
      >
        Get Free Quote
      </Button>

      <Link to="/packages">
        <Button
          variant="outline"
          className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg w-full sm:w-auto"
        >
          Explore Packages
        </Button>
      </Link>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">

      <div>
        <h3 className="text-4xl font-bold text-orange-400">
          500+
        </h3>
        <p className="text-gray-200">
          Happy Travelers
        </p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-orange-400">
          50+
        </h3>
        <p className="text-gray-200">
          Destinations
        </p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-orange-400">
          10+
        </h3>
        <p className="text-gray-200">
          Years Experience
        </p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-orange-400">
          24×7
        </h3>
        <p className="text-gray-200">
          Support
        </p>
      </div>

    </div>
  </div>
</section>
public/images/darjeeling-hero.jpg
{/* Explore Amazing Destinations Section */}
<section>
....
</section>
{/* Popular Destinations */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Popular Destinations
      </h2>

      <p className="text-lg text-gray-600">
        Discover breathtaking Himalayan destinations curated by AsianTrips
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {destinations.map((dest, index) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Link to={dest.link}>

            <div className="group relative overflow-hidden rounded-3xl shadow-xl">

              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">

                <h3 className="text-3xl font-bold text-white mb-2">
                  {dest.name}
                </h3>

                <div className="flex items-center justify-between">

                  <span className="text-white/80">
                    Explore destination
                  </span>

                  <span className="text-orange-400 font-semibold">
                    Explore →
                  </span>

                </div>

              </div>

            </div>

          </Link>
        </motion.div>
      ))}

    </div>

  </div>
</section>
{
  name: "Darjeeling",
  image: "/images/darjeeling-poster.jpg",
  link: "/destinations/darjeeling"
}
