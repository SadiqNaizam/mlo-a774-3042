import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} QuickAuth. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;