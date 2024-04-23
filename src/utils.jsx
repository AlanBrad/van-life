import { redirect } from 'react-router-dom';

export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    const response = redirect('/login');
    throw Object.defineProperty(response, 'body', { value: true });
  }
  return null;
}
