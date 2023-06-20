import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading,setisLoading]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(event)=>{
    event.preventDefault()
    const givenEmail=emailRef.current.value;
    const givenPassword=passwordRef.current.value;
    setisLoading(true);
    if (isLogin){

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQRrgkT4fxs2lThvvASjY6veknXkZZtn0',
      {
        method:'POST',
        body: JSON.stringify({
          email:givenEmail,
          password:givenPassword,
          returnSecureToken:true

        }),header:{
          'Content-type':'application/json'
        }
      }

      ).then((res)=>{
        setisLoading(false);
        if (res.ok){

        }else{
          return res.json().then((data)=>{
let errorMessage='Authentication failed';
alert(errorMessage)
          })
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading&&<button>{ isLogin ? 'login':'create account'}</button>}
          {isLoading && <p style={{color:'white'}}>sending request</p>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
