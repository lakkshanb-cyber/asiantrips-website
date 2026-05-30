import React, { useState } from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INQUIRY_STATUSES } from '@/lib/constants';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import { inquiryService } from '@/services/cmsService';

const AdminInquiries = () => {
  const [records, setRecords] = useState(inquiryService.list());
  const refresh = () => setRecords(inquiryService.list());

  const updateStatus = (id, status) => {
    inquiryService.updateStatus(id, status);
    refresh();
  };

  const remove = (id) => {
    inquiryService.remove(id);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Inquiry Management</h2>
        <p className="text-sm text-slate-600">All quote requests submitted through public forms are stored in the local mock database.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="p-4">Traveler</th><th>Trip</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {records.map((inquiry) => (
              <tr key={inquiry.id} className="border-t align-top">
                <td className="p-4"><p className="font-semibold">{inquiry.fullName}</p><p>{inquiry.phone}</p><p>{inquiry.whatsapp}</p></td>
                <td><p>{inquiry.destination}</p><p className="text-slate-500">{inquiry.travelDate || inquiry.month}</p><p className="text-slate-500">{inquiry.budget}</p></td>
                <td className="max-w-xs py-4 text-slate-600">{inquiry.message || 'No message'}</td>
                <td className="py-4">
                  <select className="rounded-md border px-2 py-1 capitalize" value={inquiry.status} onChange={(event) => updateStatus(inquiry.id, event.target.value)}>
                    {INQUIRY_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <a href={createWhatsAppUrl({ message: `Hi ${inquiry.fullName}, this is AsianTrips Holidays about your ${inquiry.destination} inquiry.` })} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a>
                    <Button variant="outline" onClick={() => remove(inquiry.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;
