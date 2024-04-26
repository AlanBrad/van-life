import { redirect } from 'react-router-dom';

export async function requireAuth() {
  // const isLoggedIn = true;
  const isLoggedIn = localStorage.getItem("loggedin")

  if (!isLoggedIn) {
    const response = redirect('/login?message=You must log in first.');
    throw Object.defineProperty(response, 'body', { value: true });
  }
  return null;
}
