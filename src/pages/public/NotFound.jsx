import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/shared/SEO';

const NotFound = () => <main className="flex min-h-[70vh] items-center justify-center px-4 text-center"><SEO title="Page Not Found" description="The requested AsianTrips Holidays page could not be found." /><div><p className="text-7xl font-bold text-orange-500">404</p><h1 className="mt-4 text-3xl font-bold">Page not found</h1><p className="mt-3 text-slate-600">This route is not available yet.</p><Button asChild className="mt-6 bg-orange-500 hover:bg-orange-600"><Link to="/">Back home</Link></Button></div></main>;
export default NotFound;
