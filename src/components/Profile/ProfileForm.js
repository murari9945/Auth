import { useRef, useState,useEffect, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../Auth/AuthContext';


const ProfileForm = (props) => {
  const newPasswordRef = useRef();
  const authCtx=useContext(AuthContext);
  //const idToken = props.idToken;
  //console.log(idToken);
  const [isLoading, setisLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;

    setisLoading(true);

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCQRrgkT4fxs2lThvvASjY6veknXkZZtn0', {
      method: 'POST',
      body: JSON.stringify({
        idToken:authCtx.token,
        password: newPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        setisLoading(false);
        if (res.ok) {
          // Password update successful
          alert('Password updated successfully');
          // Reset the password input field
          newPasswordRef.current.value = '';
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Password update failed';
            alert(errorMessage);
            console.log(data);
          });
        }
      })
      .catch((error) => {
        setisLoading(false);
        console.log('Error:', error);
      });
  };
  

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button  disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

