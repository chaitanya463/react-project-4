import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    console.log(`loggedout`);
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);

  };

  useEffect(() => {
    const storedUser = localStorage.getItem('isLoggedIn');
    if (storedUser == '1') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn: isLoggedIn, onLogOut: logoutHandler, onLogin: loginHandler}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
