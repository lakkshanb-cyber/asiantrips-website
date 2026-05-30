import { SITE } from '@/lib/constants';

export const createWhatsAppUrl = ({ phone = SITE.whatsapp, message = '' } = {}) => {
  const encoded = encodeURIComponent(message || `Hi ${SITE.name}, I want to plan a trip.`);
  return `https://wa.me/${phone}?text=${encoded}`;
};

export const packageWhatsAppMessage = (pkg) =>
  `Hi ${SITE.name}, I am interested in ${pkg?.title || 'a tour package'}. Please share details, availability, and pricing.`;

export const destinationWhatsAppMessage = (destination) =>
  `Hi ${SITE.name}, I want to plan a trip to ${destination?.name || 'your destinations'}. Please help me with an itinerary.`;
