import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const QuoteForm = ({ onSuccess, className = "" }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    destination: 'Sikkim',
    month: '',
    travelers: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Google Ads Conversion Tracking Helper
  const trackConversion = () => {
    // Placeholder for Google Ads Conversion Code
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/LABEL_CODE', // Replace with actual ID
        'event_callback': () => {
          console.log('Conversion tracked');
        }
      });
    } else {
      console.log('Google Ads Conversion Tracking: Triggered (Mock)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ------------------------------------------------------------------
    // EMAIL SUBMISSION CONFIGURATION
    // ------------------------------------------------------------------
    // Target Recipients: info@asiantrips.com, lakkshanb@gmail.com
    //
    // NOTE: As this is a frontend-only environment, we are simulating
    // the backend email dispatch. In production, connect this to:
    // 1. Supabase Edge Functions (recommended)
    // 2. EmailJS / Formspree
    // 3. Custom Backend API
    // ------------------------------------------------------------------

    try {
      // Simulate network request logs for verification
      console.group("🚀 Sending Quote Request");
      console.log("TO: info@asiantrips.com");
      console.log("CC: lakkshanb@gmail.com");
      console.log("📦 PAYLOAD:", formData);
      console.groupEnd();

      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger Conversion Tracking
      trackConversion();

      // Show success state
      setIsSuccess(true);
      
      // Optional: Trigger parent success callback
      if (onSuccess) onSuccess();

      // Toast notification
      toast({
        title: "Quote Request Sent!",
        description: "We'll be in touch shortly.",
      });

    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-green-50 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px] border border-green-100 ${className}`}
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 max-w-xs mx-auto mb-6">
          Your inquiry has been sent to our travel experts. We will contact you shortly to plan your perfect trip.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              fullName: '',
              phone: '',
              whatsapp: '',
              destination: 'Sikkim',
              month: '',
              travelers: '',
              budget: '',
              message: ''
            });
          }}
          className="bg-white border-green-200 text-green-700 hover:bg-green-50"
        >
          Send Another Inquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input 
            id="fullName" 
            name="fullName"
            required 
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (+91) *</Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel"
            required 
            placeholder="+91 99999 99999"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp (Optional)</Label>
          <Input 
            id="whatsapp" 
            name="whatsapp"
            type="tel"
            placeholder="If different from phone"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination *</Label>
          <div className="relative">
            <select
              id="destination"
              name="destination"
              required
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              value={formData.destination}
              onChange={handleChange}
            >
              <option value="Sikkim">Sikkim</option>
              <option value="Darjeeling">Darjeeling</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Nepal">Nepal</option>
              <option value="Northeast India">Northeast India</option>
              <option value="Custom Trip">Custom / Combination</option>
            </select>
            {/* Custom arrow if needed, but browser default is often fine for native select */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="month">Travel Month *</Label>
          <select
            id="month"
            name="month"
            required
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.month}
            onChange={handleChange}
          >
            <option value="" disabled>Select Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelers">No. of Travelers *</Label>
          <Input 
            id="travelers" 
            name="travelers"
            type="number"
            min="1"
            required 
            placeholder="e.g. 2 Adults, 1 Child"
            value={formData.travelers}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Approx. Budget (Optional)</Label>
        <select
          id="budget"
          name="budget"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.budget}
          onChange={handleChange}
        >
          <option value="">Select Budget Range</option>
          <option value="Economy">Economy (Budget Friendly)</option>
          <option value="Standard">Standard (3 Star Hotels)</option>
          <option value="Premium">Premium (4 Star & Boutique)</option>
          <option value="Luxury">Luxury (5 Star)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message / Special Requirements</Label>
        <Textarea 
          id="message" 
          name="message"
          placeholder="Tell us about your preferences, specific places you want to visit, or any questions..."
          className="min-h-[100px]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-6 mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending Request...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Get My Free Quote
          </>
        )}
      </Button>
      
      <p className="text-xs text-center text-gray-500 mt-2">
        Your details are safe with us. We never spam.
      </p>
    </form>
  );
};

export default QuoteForm;