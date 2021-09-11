import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useAuthState} from "react-firebase-hooks/auth";

import SignIn from "./components/Auth/SingIn";
import SignOut from "./components/Auth/SingOut";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import "./config";

const auth = firebase.auth();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <header>
        <h1>App!!!</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

export default App;
