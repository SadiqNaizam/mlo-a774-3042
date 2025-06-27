import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AuthSuccessPage = () => {
  console.log('AuthSuccessPage loaded');

  const navigate = useNavigate();
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Animate the progress bar
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 100 : prev + 20));
    }, 600);

    // Redirect after 3 seconds to the main application dashboard
    // Note: '/dashboard' is a placeholder for the main app route.
    // In this project's App.tsx, it will lead to the NotFound page, which is expected behavior for this standalone component.
    const redirectTimeout = setTimeout(() => {
      navigate('/dashboard'); 
    }, 3000);

    // Cleanup timers on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Authentication Successful!</CardTitle>
            <CardDescription>Welcome back. Please wait a moment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="default" className="border-green-300 bg-green-50 text-green-800">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                You have been successfully authenticated. Redirecting you to your dashboard now.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">Loading your experience...</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthSuccessPage;