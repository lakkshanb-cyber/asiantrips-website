import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuoteModal } from '@/context/QuoteModalContext';
import QuoteForm from '@/components/QuoteForm';

const QuoteModal = () => {
  const { isOpen, closeModal } = useQuoteModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-blue-950 text-center">Plan Your Dream Trip</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Fill out the form below and our local experts will craft a personalized itinerary for you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <QuoteForm onSuccess={() => {
            // Optional: Close modal after success (delayed)
            // setTimeout(closeModal, 3000); 
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;