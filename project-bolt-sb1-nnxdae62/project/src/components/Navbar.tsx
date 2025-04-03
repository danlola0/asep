import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  FileText, 
  Calculator, 
  FolderArchive, 
  Settings,
  Wallet,
  Users
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
  { name: 'Livre de caisse', path: '/caisse', icon: Wallet },
  { name: 'Opérations', path: '/operations', icon: Receipt },
  { name: 'Factures', path: '/factures', icon: FileText },
  { name: 'Fiscalité', path: '/fiscalite', icon: Calculator },
  { name: 'IPR', path: '/ipr', icon: Users },
  { name: 'Documents', path: '/documents', icon: FolderArchive },
  { name: 'Paramètres', path: '/parametres', icon: Settings },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-white">Asepfinance</h1>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${
                      isActive
                        ? 'bg-secondary-500 text-white'
                        : 'text-white hover:bg-primary-500'
                    } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;