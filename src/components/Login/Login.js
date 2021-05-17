import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.value, isValid: action.value.includes('@')};
  }
  if (action.type === 'BLUR_INPUT') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.length > 6 };
  }
  if (action.type === 'BLUR_INPUT') {
    return {value: state.value, isValid: state.value.length > 6 };
  }
  return {value: '', isValid: false};
};

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const {isValid: emailIsValid} = emailState;
  const {isValid: pwdIsValid} = passwordState;




  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && pwdIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, pwdIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value});
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', payload: event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'BLUR_INPUT'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'BLUR_INPUT'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authContext.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailIsValid) {
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-Mail'
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          />
        <Input
          ref={passwordInputRef}
          id="password"
          label="password"
          type="password"
          isValid={pwdIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
