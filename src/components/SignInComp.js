import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();




  // Handle the submission of the sign-in form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate('/'); // Use React Router's navigate
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className='signin' >
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className='form '>
        <div className='credentialsfield-email'>
          {/* <label htmlFor="email">Enter email address</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder='email'
            required
          />
        </div>
        <div className='credentialsfield-password'>
          {/* <label htmlFor="password">Enter password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="signin-password"
            name="password"
            type="password"
            value={password}
            placeholder='password'
            required
          />
        </div>
        <button type="submit" className='signbuttons'>Sign in</button>
      </form>
    </div>
  );
}
