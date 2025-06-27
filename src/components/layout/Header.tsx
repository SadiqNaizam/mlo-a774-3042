import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold sm:text-base">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold">QuickAuth</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;