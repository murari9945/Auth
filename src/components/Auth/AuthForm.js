import { useState, useRef, useContext,useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import ProfileForm from '../Profile/ProfileForm';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  //const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
 // const [passwordUpdated, setPasswordUpdated] = useState(false);
  const authContext = useContext(AuthContext);
 // const newPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
 // const updatePasswordHandler = () => {
  //  setIsUpdatingPassword(true);
 // };

  const submitHandler = (event) => {
    event.preventDefault();
    const givenEmail = emailRef.current.value;
    const givenPassword = passwordRef.current.value;
   // const newPassword = newPasswordRef.current.value;

    setisLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQRrgkT4fxs2lThvvASjY6veknXkZZtn0', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password: givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            return res.json().then((data) => {
              const idToken = data.idToken;
              console.log(idToken);
              authContext.login(idToken);
              history.push('/');
            });
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQRrgkT4fxs2lThvvASjY6veknXkZZtn0', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password:givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            // Handle successful sign-up
            
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    }

   // if (!isLogin && passwordUpdated) {
    //  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCQRrgkT4fxs2lThvvASjY6veknXkZZtn0`, {
     //   method: 'POST',
      //  body: JSON.stringify({
       //   idToken: authContext.token,
       //   password: newPassword,
       //   returnSecureToken: true,
      //  }),
      //  headers: {
      //    'Content-type': 'application/json',
      //  },
     // })
      //  .then((res) => {
       //   setisLoading(false);
       //   if (res.ok) {
            // Password update successful
         //    setPasswordUpdated(true);

         //   alert('Password updated successfully');
//} else {
           // return res.json().then((data) => {
           //   let errorMessage = 'Password update failed';
           //   alert(errorMessage);
           //   console.log(data);
           // });
        //  }
        //})
      //  .catch((error) => {
      //    setisLoading(false);
        //  console.log('Error:', error);
      //  });
   // }
  };
 // useEffect(() => {
  //  setPasswordUpdated(false); // Reset passwordUpdated state when switching login mode
 // }, [isLogin]);

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'login' : 'create account'}</button>}
          {isLoading && <p style={{ color: 'white' }}>sending request</p>}

          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {authContext.isLoggedIn && <ProfileForm idToken={authContext.token}/>}
    </section>
  );
};

export default AuthForm;
