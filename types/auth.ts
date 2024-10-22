// types/auth.ts
export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  