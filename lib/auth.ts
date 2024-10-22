// lib/auth.ts
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import type { User } from '@/types/auth';

interface DecodedToken {
  sub: number;
  exp: number;
}

export async function getServerSideUser(): Promise<User | null> {
  const token = cookies().get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}