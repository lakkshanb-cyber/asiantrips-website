import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Destinations from '@/pages/Destinations';
import Packages from '@/pages/Packages';
import Contact from '@/pages/Contact';
import PackageDetail from '@/pages/public/PackageDetail';
import DestinationDetail from '@/pages/public/DestinationDetail';
import BlogList from '@/pages/public/BlogList';
import BlogDetail from '@/pages/public/BlogDetail';
import Gallery from '@/pages/public/Gallery';
import Testimonials from '@/pages/public/Testimonials';
import NotFound from '@/pages/public/NotFound';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCrudPage from '@/pages/admin/AdminCrudPage';
import AdminInquiries from '@/pages/admin/AdminInquiries';
import AdminTracking from '@/pages/admin/AdminTracking';
import { QuoteModalProvider } from '@/context/QuoteModalContext';
import { AuthProvider } from '@/context/AuthContext';
import QuoteModal from '@/components/QuoteModal';
import { trackPageView } from '@/lib/analytics';

const RouteAnalytics = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      <RouteAnalytics />
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:slug" element={<PackageDetail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="destinations" element={<AdminCrudPage type="destinations" />} />
          <Route path="packages" element={<AdminCrudPage type="packages" />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="blog" element={<AdminCrudPage type="blog" />} />
          <Route path="gallery" element={<AdminCrudPage type="gallery" />} />
          <Route path="testimonials" element={<AdminCrudPage type="testimonials" />} />
          <Route path="tracking" element={<AdminTracking />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <QuoteModal />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuoteModalProvider>
          <AppRoutes />
        </QuoteModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
