// components/UserMenu.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/auth';

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
        <span>{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}