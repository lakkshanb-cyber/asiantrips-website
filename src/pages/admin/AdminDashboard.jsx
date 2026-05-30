import React from 'react';
import { Link } from 'react-router-dom';
import { Map, MessageSquare, Package, Star } from 'lucide-react';
import { destinationService, inquiryService, packageService, testimonialService } from '@/services/cmsService';

const StatCard = ({ label, value, icon: Icon, tone }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className={`mb-4 inline-flex rounded-xl p-3 ${tone}`}><Icon className="h-6 w-6" /></div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

const AdminDashboard = () => {
  const stats = inquiryService.stats();
  const recent = inquiryService.list().slice(0, 5);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard overview</h2>
        <p className="text-slate-600">Mock CMS data is persisted in browser localStorage until Supabase is connected.</p>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published destinations" value={destinationService.published().length} icon={Map} tone="bg-blue-50 text-blue-700" />
        <StatCard label="Tour packages" value={packageService.published().length} icon={Package} tone="bg-orange-50 text-orange-700" />
        <StatCard label="New inquiries" value={stats.newCount} icon={MessageSquare} tone="bg-green-50 text-green-700" />
        <StatCard label="Testimonials" value={testimonialService.published().length} icon={Star} tone="bg-purple-50 text-purple-700" />
      </div>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent inquiries</h3>
          <Link to="/admin/inquiries" className="text-sm font-medium text-orange-600">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-2">Name</th><th>Destination</th><th>Status</th><th>Phone</th></tr></thead>
            <tbody>
              {recent.map((inquiry) => (
                <tr key={inquiry.id} className="border-t"><td className="py-3 font-medium">{inquiry.fullName}</td><td>{inquiry.destination}</td><td className="capitalize">{inquiry.status}</td><td>{inquiry.phone}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
