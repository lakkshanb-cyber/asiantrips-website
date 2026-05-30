import React from 'react';
import { BarChart3 } from 'lucide-react';
import { inquiryService } from '@/services/cmsService';

const AdminTracking = () => {
  const stats = inquiryService.stats();
  const rows = [
    ['Package inquiries', stats.total, 'Tracked when package detail CTA forms submit.'],
    ['Destination inquiries', stats.total, 'Tracked when destination-specific quote flows submit.'],
    ['WhatsApp clicks', 'Mock event', 'trackEvent("whatsapp_click") is wired for public CTA helpers.'],
    ['Conversions', stats.converted, 'Admin can mark inquiries as converted.'],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Lead Tracking</h2>
        <p className="text-sm text-slate-600">GA4 and Supabase analytics placeholders are centralized for activation after external setup.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map(([label, value, help]) => (
          <div key={label} className="rounded-2xl border bg-white p-6 shadow-sm">
            <BarChart3 className="mb-4 h-7 w-7 text-orange-500" />
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="font-medium text-slate-700">{label}</p>
            <p className="mt-2 text-sm text-slate-500">{help}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTracking;
