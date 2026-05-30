import React, { useMemo, useState } from 'react';
import { CheckCircle2, MessageCircle, Search, Trash2, TrendingUp, UserCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { INQUIRY_STATUSES } from '@/lib/constants';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import { inquiryService } from '@/services/cmsService';

const StatCard = ({ label, value, icon: Icon, tone }) => (
  <div className="rounded-2xl border bg-white p-5 shadow-sm">
    <div className={`mb-3 inline-flex rounded-xl p-3 ${tone}`}><Icon className="h-5 w-5" /></div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

const AdminInquiries = () => {
  const [records, setRecords] = useState(inquiryService.list());
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const stats = inquiryService.stats();

  const refresh = () => setRecords(inquiryService.list());

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((inquiry) => {
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
      const searchable = [inquiry.fullName, inquiry.phone, inquiry.whatsapp, inquiry.destination, inquiry.travelDate, inquiry.month, inquiry.budget, inquiry.message, inquiry.sourceType]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, records, statusFilter]);

  const updateStatus = (id, status) => {
    inquiryService.updateStatus(id, status);
    refresh();
  };

  const remove = (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    inquiryService.remove(id);
    refresh();
  };

  const quickStatusButton = (inquiry, status, label, Icon) => (
    <Button key={status} variant="outline" size="sm" onClick={() => updateStatus(inquiry.id, status)} disabled={inquiry.status === status}>
      <Icon className="mr-1 h-3.5 w-3.5" /> {label}
    </Button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Inquiry Management</h2>
        <p className="text-sm text-slate-600">Search, filter, contact, convert, and track quote requests from the mock CMS database.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total inquiries" value={stats.total} icon={Users} tone="bg-blue-50 text-blue-700" />
        <StatCard label="New inquiries" value={stats.newCount} icon={MessageCircle} tone="bg-orange-50 text-orange-700" />
        <StatCard label="Contacted" value={stats.contacted} icon={UserCheck} tone="bg-emerald-50 text-emerald-700" />
        <StatCard label="Converted" value={stats.converted} icon={TrendingUp} tone="bg-purple-50 text-purple-700" />
      </div>

      <div className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <label className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by traveler, destination, phone, budget, or message..." className="pl-9" />
        </label>
        <select className="h-10 rounded-md border px-3 text-sm capitalize" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All statuses</option>
          {INQUIRY_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr><th className="p-4">Traveler</th><th>Trip</th><th>Message</th><th>Status</th><th>Quick actions</th><th>Contact</th></tr>
          </thead>
          <tbody>
            {filteredRecords.map((inquiry) => (
              <tr key={inquiry.id} className="border-t align-top">
                <td className="p-4">
                  <p className="font-semibold text-slate-900">{inquiry.fullName}</p>
                  <p>{inquiry.phone}</p>
                  <p>{inquiry.whatsapp}</p>
                  <p className="mt-1 text-xs text-slate-400">{inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'No date'}</p>
                </td>
                <td><p>{inquiry.destination}</p><p className="text-slate-500">{inquiry.travelDate || inquiry.month}</p><p className="text-slate-500">{inquiry.budget}</p></td>
                <td className="max-w-xs py-4 text-slate-600">{inquiry.message || 'No message'}</td>
                <td className="py-4">
                  <select className="rounded-md border px-2 py-1 capitalize" value={inquiry.status} onChange={(event) => updateStatus(inquiry.id, event.target.value)}>
                    {INQUIRY_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {quickStatusButton(inquiry, 'contacted', 'Contacted', UserCheck)}
                    {quickStatusButton(inquiry, 'converted', 'Converted', CheckCircle2)}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <a href={createWhatsAppUrl({ message: `Hi ${inquiry.fullName}, this is AsianTrips Holidays about your ${inquiry.destination} inquiry.` })} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a>
                    <Button variant="outline" onClick={() => remove(inquiry.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr><td className="p-8 text-center text-slate-500" colSpan="6">No inquiries match the selected filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;
