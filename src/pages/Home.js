import React from "react";
import AuthHOC from "../utils/Auth";
import ChatApp from "../component/ChatApp";



const Home = () => {
  return (
    <ChatApp/>
  )
}

export default AuthHOC(Home);