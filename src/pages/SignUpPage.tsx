import React from 'react';
import AuthForm from '@/components/AuthForm'; // Custom Component
import Footer from '@/components/layout/Footer'; // Custom Component
import Header from '@/components/layout/Header'; // Custom Component

const SignUpPage: React.FC = () => {
  console.log('SignUpPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthForm formType="signup" />
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;