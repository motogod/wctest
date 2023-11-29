import React, {createContext, useState} from 'react';

const SignContext = createContext(null);

const SignProvider = (props: any) => {
  const [value, setValue] = useState('');

  const changeSignature = (data: string) => {
    setValue(data);
  };

  return (
    <SignContext.Provider value={{value, changeSignature}}>
      {props.children}
    </SignContext.Provider>
  );
};

export {SignContext, SignProvider};
