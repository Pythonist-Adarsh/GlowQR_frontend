import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden flex flex-col">
        {children}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
