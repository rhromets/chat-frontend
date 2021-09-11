import React from "react";

import firebase from "firebase/compat/app";

import "../../config";

const auth = firebase.auth();

const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
};

export default SignOut;
