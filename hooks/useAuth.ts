// hooks/useAuth.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>('/api/auth/user');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const login = async (credentials: LoginCredentials) => {
    const { data } = await api.post('/api/auth/login', credentials);
    await getUser();
    router.refresh();
    router.push('/');
    return data;
  };

  const register = async (credentials: RegisterCredentials) => {
    const { data } = await api.post('/api/auth/register', credentials);
    await getUser();
    router.refresh();
    router.push('/');
    return data;
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    setUser(null);
    router.refresh();
    router.push('/login');
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}
