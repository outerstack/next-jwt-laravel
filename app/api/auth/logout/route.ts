// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const token = cookies().get('token')?.value;
    
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  }

  // Always clear the cookie
  cookies().delete('token');
  
  return NextResponse.json({ success: true });
}
