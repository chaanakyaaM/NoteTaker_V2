import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate()



  // Handle submission of the sign-up form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (err) {
      alert(err)
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        // Redirect user to home or another page here
        navigate('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label htmlFor="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className='signup' >
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit} className='form'>
        <div className='credentialsfield-email'>
          {/* <label htmlFor="email">Enter email address</label> */}
          <input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            placeholder='email'
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div className='credentialsfield-password'>
          {/* <label htmlFor="password">Enter password</label> */}
          <input
            id="signup-password"
            type="password"
            name="password"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            requ
          />
        </div>
        <div>
          <button type="submit" className='signbuttons'>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
