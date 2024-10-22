# Next.js 14 Laravel JWT Authentication

A complete authentication system for Next.js 14 App Router with Laravel JWT backend.

## Features

- 🔐 JWT Authentication with HTTP-only cookies
- 📱 Full-stack type safety
- 🚀 Next.js 14 App Router
- 🔄 Server and Client Components
- 🛡️ Protected routes
- 🎨 Tailwind CSS styling
- 📝 TypeScript support

## Prerequisites

- Node.js 18.17 or later
- Laravel 11 backend with JWT authentication set up
- Laravel backend running on `http://localhost:8000` (or update `.env.local` accordingly)

## Quick Start

1. Create a new Next.js project:
```bash
npx create-next-app@latest my-app
# Select the following options:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias (@/*)? Yes
```

2. Install required dependencies:
```bash
npm install axios jwt-decode
```

3. Create the project structure:
```bash
mkdir -p app/{api/auth,(auth),(protected)} components hooks lib types
```

4. Create `.env.local` in your project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Copy the following files into your project structure:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (protected)/
│   ├── layout.tsx
│   └── page.tsx
├── api/
│   └── auth/
│       ├── login/
│       │   └── route.ts
│       ├── logout/
│       │   └── route.ts
│       ├── register/
│       │   └── route.ts
│       └── user/
│           └── route.ts
├── layout.tsx
└── page.tsx
components/
└── UserMenu.tsx
hooks/
└── useAuth.ts
lib/
├── api.ts
└── auth.ts
types/
└── auth.ts
middleware.ts
```

6. Configure your Laravel backend:

```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## Usage

### Protected Routes
Any routes under `app/(protected)` are automatically protected and require authentication:

```typescript
// app/(protected)/page.tsx
import { getServerSideUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getServerSideUser();
  return <h1>Welcome, {user?.name}!</h1>;
}
```

### Authentication Hook
Use the `useAuth` hook in client components:

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export function LoginButton() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password',
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### API Routes
The following API routes are available:

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get authenticated user

## Type Safety

The project includes TypeScript definitions for authentication:

```typescript
// types/auth.ts
interface User {
  id: number;
  name: string;
  email: string;
  // ... other user properties
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
  password_confirmation: string;
}
```

## Authentication Flow

1. User visits protected route
2. Middleware checks for JWT token in cookies
3. If no token, redirect to login
4. On successful login, token stored in HTTP-only cookie
5. Protected routes verify token server-side
6. Client components use `useAuth` hook for state

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Security Features

- JWT tokens stored in HTTP-only cookies
- Server-side authentication checks
- Protected API routes
- Secure password handling
- CSRF protection via sameSite cookies
- Type safety throughout

## Common Issues

1. CORS errors:
   - Ensure Laravel CORS configuration matches your frontend URL
   - Check `supports_credentials` is true in CORS config

2. Authentication not persisting:
   - Verify cookies are being set
   - Check sameSite and secure cookie settings

3. Type errors:
   - Run `tsc --noEmit` to check for type issues
   - Ensure all required types are imported

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Next.js team for the incredible framework
- Laravel team for the robust backend framework
- JWT-Auth package for Laravel JWT authentication
