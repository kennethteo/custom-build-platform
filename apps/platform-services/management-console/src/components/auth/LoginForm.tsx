'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Remove Zod schema - we'll validate manually
interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFieldError,
    clearErrors,
    watch,
    setValue,
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  });

  // Watch form values for debugging
  const watchedValues = watch();
  console.log('Current form values:', watchedValues);

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted with data:', data); // Debug log
    console.log('Local form state:', formData); // Debug log
    
    try {
      setIsLoading(true);
      setError(null);
      clearErrors(); // Clear any previous field errors
      
      // Use local state as fallback if form data is empty
      const emailOrUsername = (data.emailOrUsername || formData.emailOrUsername)?.trim() || '';
      const password = (data.password || formData.password)?.trim() || '';
      
      console.log('Trimmed values:', { emailOrUsername, password }); // Debug log
      
      let hasErrors = false;
      
      if (!emailOrUsername) {
        console.log('Email/username is empty'); // Debug log
        setFieldError('emailOrUsername', { 
          type: 'required', 
          message: 'Email or username is required' 
        });
        hasErrors = true;
      }
      
      if (!password) {
        console.log('Password is empty'); // Debug log
        setFieldError('password', { 
          type: 'required', 
          message: 'Password is required' 
        });
        hasErrors = true;
      }
      
      if (hasErrors) {
        setIsLoading(false);
        return;
      }
      
      // Additional format validation
      if (emailOrUsername.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailOrUsername)) {
          setError('Please enter a valid email address');
          setIsLoading(false);
          return;
        }
      } else {
        if (emailOrUsername.length < 2) {
          setError('Username must be at least 2 characters long');
          setIsLoading(false);
          return;
        }
        if (!/^[a-zA-Z0-9_.-]+$/.test(emailOrUsername)) {
          setError('Username can only contain letters, numbers, dots, hyphens, and underscores');
          setIsLoading(false);
          return;
        }
      }
      
      await login(emailOrUsername, password);
    } catch (err: any) {
      // Handle different types of login errors
      if (err.response?.status === 401) {
        setError('Invalid email/username or password. Please try again.');
      } else if (err.response?.status === 429) {
        setError('Too many login attempts. Please try again later.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Input
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          autoComplete="username"
          value={formData.emailOrUsername}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, emailOrUsername: value }));
            setValue('emailOrUsername', value);
            clearErrors('emailOrUsername');
            setError(null);
          }}
          error={errors.emailOrUsername?.message}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, password: value }));
            setValue('password', value);
            clearErrors('password');
            setError(null);
          }}
          error={errors.password?.message}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm text-red-700 font-medium">{error}</div>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
}
