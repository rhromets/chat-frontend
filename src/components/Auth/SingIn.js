import React from "react";

import firebase from "firebase/compat/app";

import "../../config";

const auth = firebase.auth();

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignIn;
