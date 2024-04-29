import React from 'react';
import {
  useActionData,
  useLoaderData,
  // useNavigate,
  useNavigation,
  redirect,
  Form,
} from 'react-router-dom';
import { loginUser } from '../api';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  // const data = await loginUser({ email, password });
  // localStorage.setItem('loggedin', true);
  // const response = redirect('/host');
  // throw Object.defineProperty(response, 'body', { value: true });
  // return null;
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem('loggedin', true);
    const response = redirect('/host');
    return Object.defineProperty(response, 'body', { value: true });
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  // const [status, setStatus] = React.useState('idle');
  // const [error, setError] = React.useState(null);
  const errorMessage = useActionData();
  const message = useLoaderData();
  // const navigate = useNavigate();
  const navigation = useNavigation();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   // setError(null);
  //   const user = loginUser(loginFormData)
  //     .then((data) => navigate('/host', { replace: true }))
  //     // .catch((err) => setError(err))
  //     .finally(() => setStatus('idle'));
  // }

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
      {/* {error && <h3 className='red'>{error.message}</h3>} */}
      {message && <h3 className='red'>{message}</h3>}
      {errorMessage && <h3 className='red'>{errorMessage}</h3>}
      <Form method='post' className='login-form' replace>
        <input name='email' type='email' placeholder='Email address' />
        <input name='password' type='password' placeholder='Password' />
        <button disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  );
}
