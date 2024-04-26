import React from 'react';
import { useLoaderData, useNavigate, redirect, Form } from 'react-router-dom';
import { loginUser } from '../api';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const data = await loginUser({ email, password });
  // console.log('here');
  localStorage.setItem('loggedin', true);
  // console.log(data);
  const response = redirect('/host');
  throw Object.defineProperty(response, 'body', { value: true });
  return null;
}

export default function Login() {
  // const [loginFormData, setLoginFormData] = React.useState({
  //   email: '',
  //   password: '',
  // });
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState(null);
  const message = useLoaderData();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    const user = loginUser(loginFormData)
      .then((data) => navigate('/host', { replace: true }))
      .catch((err) => setError(err))
      .finally(() => setStatus('idle'));
  }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setError(null); // I put this in here to make the error message
  //   // disappear as soon as the user starts typing
  //   setLoginFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
      {error && <h3 className='red'>{error.message}</h3>}
      {message && <h3 className='red'>{message}</h3>}
      {/* <Form onSubmit={handleSubmit} className='login-form'> */}
      <Form method='post' className='login-form' replace>
        <input
          name='email'
          // onChange={handleChange}
          type='email'
          placeholder='Email address'
          // value={loginFormData.email}
        />
        <input
          name='password'
          // onChange={handleChange}
          type='password'
          placeholder='Password'
          // value={loginFormData.password}
        />
        <button disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  );
}
