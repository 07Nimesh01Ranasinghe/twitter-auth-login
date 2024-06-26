import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import twitterImg from './images/twitter.png';
import './style.css'

const Login = () => {
  const onSuccess = (response) => {
    response.json().then(user => {
      console.log(user);
      // Handle the response, e.g., save the user data in state or context
      // Redirect to OTP verification page after successful Twitter login
      // Assuming your backend sends back the necessary oauthToken and oauthTokenSecret
      // You'll need to implement this based on your backend response
    });
  };

  const onFailed = (error) => {
    console.error(error);
  };

  return (
    <div className='login'>
        <img src={twitterImg} className='loginImag' />
      <h2 id='logStatement'>Login with Twitter</h2>
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={onFailed}
        onSuccess={onSuccess}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        showIcon={true}
        className='twitterBtn'
      >
        Login
      </TwitterLogin>
    </div>
  );
};

export default Login;
