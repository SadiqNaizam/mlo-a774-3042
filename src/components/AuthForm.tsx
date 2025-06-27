import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Github, Chrome } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormType = "login" | "signup" | "forgot-password" | "reset-password";

interface AuthFormProps {
  formType: FormType;
}

const formSchemas = {
  login: z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
  }),
  signup: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  }),
  "forgot-password": z.object({
    email: z.string().email({ message: "Please enter a valid email address to reset your password." }),
  }),
  "reset-password": z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }),
};

const formConfig = {
  login: {
    title: "Welcome Back!",
    description: "Enter your credentials to access your account.",
    buttonText: "Log In",
    footerText: "Don't have an account?",
    footerLink: "/sign-up",
    footerLinkText: "Sign Up",
  },
  signup: {
    title: "Create an Account",
    description: "Enter your information to create a new account.",
    buttonText: "Sign Up",
    footerText: "Already have an account?",
    footerLink: "/",
    footerLinkText: "Log In",
  },
  "forgot-password": {
    title: "Forgot Password?",
    description: "Enter your email and we'll send you a reset link.",
    buttonText: "Send Reset Link",
  },
  "reset-password": {
    title: "Set a New Password",
    description: "Create a new strong password for your account.",
    buttonText: "Set New Password",
  },
};

export function AuthForm({ formType }: AuthFormProps) {
  console.log(`AuthForm loaded for type: ${formType}`);
  const navigate = useNavigate();

  const selectedSchema = formSchemas[formType];
  const config = formConfig[formType];
  type FormValues = z.infer<typeof selectedSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    console.log("Form submitted with values:", values);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      switch(formType) {
        case 'login':
          toast.success("Login Successful!", { description: "Redirecting you to the dashboard..." });
          navigate('/auth-success');
          break;
        case 'signup':
          toast.success("Account Created!", { description: "Please log in to continue." });
          navigate('/');
          break;
        case 'forgot-password':
          toast.info("Password Reset Link Sent", { description: "If an account exists, you will receive an email." });
          break;
        case 'reset-password':
          toast.success("Password Updated Successfully!", { description: "Please log in with your new password." });
          navigate('/');
          break;
      }
    }, 1500);
  };

  const onSocialLogin = (provider: 'google' | 'github') => {
    toast.info(`Attempting to log in with ${provider}...`);
    console.log(`Social login attempt with ${provider}`);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formType === "signup" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {(formType === "login" || formType === "signup" || formType === "forgot-password") && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {(formType === "login" || formType === "signup" || formType === "reset-password") && (
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>{formType === 'reset-password' ? 'New Password' : 'Password'}</FormLabel>
                      {formType === 'login' && (
                        <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {formType === "reset-password" && (
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : config.buttonText}
            </Button>
          </form>
        </Form>
        {(formType === 'login' || formType === 'signup') && (
            <>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => onSocialLogin('github')} disabled={isLoading}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                    <Button variant="outline" onClick={() => onSocialLogin('google')} disabled={isLoading}>
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                </div>
            </>
        )}
      </CardContent>
      {config.footerText && (
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            {config.footerText}{" "}
            <Link to={config.footerLink!} className="underline font-medium hover:text-primary">
              {config.footerLinkText}
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

export default AuthForm;