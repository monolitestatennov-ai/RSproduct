import { useLocation } from 'wouter';
import { Home, FolderOpen, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MobileNavigation() {
  const [location, navigate] = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/portfolio', icon: FolderOpen, label: 'Портфель' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/property', icon: Settings, label: 'Объект' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                isActive ? 'text-blue-600' : 'text-slate-600'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavigation;

