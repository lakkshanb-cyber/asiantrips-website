import React, { useCallback } from 'react';
import { BarChart3 } from 'lucide-react';
import { inquiryService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const AdminTracking = () => {
  const loadStats = useCallback(() => inquiryService.stats(), []);
  const { data: stats, error } = useAsyncData(loadStats, { total: 0, converted: 0 });
  const rows = [
    ['Package inquiries', stats.total, 'Tracked when package detail CTA forms submit.'],
    ['Destination inquiries', stats.total, 'Tracked when destination-specific quote flows submit.'],
    ['WhatsApp clicks', 'GA4 event', 'trackEvent("whatsapp_click") is wired for public CTA helpers.'],
    ['Conversions', stats.converted, 'Admin can mark inquiries as converted.'],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Lead Tracking</h2>
        <p className="text-sm text-slate-600">GA4 events and Supabase inquiry status tracking are wired for live CMS data.</p>
      </div>
      {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
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
