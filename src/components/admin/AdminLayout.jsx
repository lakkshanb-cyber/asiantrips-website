import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Image, LayoutDashboard, LogOut, Map, MessageSquare, Newspaper, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Destinations', path: '/admin/destinations', icon: Map },
  { label: 'Packages', path: '/admin/packages', icon: Package },
  { label: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  { label: 'Blog', path: '/admin/blog', icon: Newspaper },
  { label: 'Gallery', path: '/admin/gallery', icon: Image },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { label: 'Lead Tracking', path: '/admin/tracking', icon: BarChart3 },
];

const AdminLayout = () => {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="bg-blue-950 text-white lg:w-72">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link to="/admin" className="rounded bg-white px-3 py-2">
            <AsianTripsLogo type="minimal" />
          </Link>
          <Link to="/" className="text-xs text-blue-100 hover:text-white">View site</Link>
        </div>
        <nav className="grid gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-orange-500 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-orange-600">CMS Control Center</p>
            <h1 className="text-xl font-bold text-slate-900">AsianTrips Holidays Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{adminUser?.name}</span>
            <Button variant="outline" onClick={() => { logout(); navigate('/admin/login'); }}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
