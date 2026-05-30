import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { ADMIN_DEMO_USER } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import SEO from '@/components/shared/SEO';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: ADMIN_DEMO_USER.email, password: ADMIN_DEMO_USER.password });
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-orange-500 p-4">
      <SEO title="Admin Login" description="AsianTrips Holidays admin login." path="/admin/login" />
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-xl border p-3"><AsianTripsLogo type="minimal" /></div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">Supabase Auth placeholder using demo local credentials.</p>
        </div>
        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </div>
          <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit"><Lock className="mr-2 h-4 w-4" /> Sign in</Button>
        </div>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
          <p><strong>Demo email:</strong> {ADMIN_DEMO_USER.email}</p>
          <p><strong>Demo password:</strong> {ADMIN_DEMO_USER.password}</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
