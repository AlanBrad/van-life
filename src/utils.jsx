import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem('loggedin');

  if (!isLoggedIn) {
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    throw Object.defineProperty(response, 'body', { value: true });
  }
  return null;
}
