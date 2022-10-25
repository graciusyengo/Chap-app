import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./conversation.css";

function Conversation({conversation, currentUser}) {
  const [user,setUser]=useState(null)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // console.log(conversation)
    // console.log(user.profilePicture)
 
  useEffect(()=>{
    const friendId= conversation.members.find(member=>member!==currentUser._id)
      const getUser= async ()=>{
        try{
          const res = await axios("/users?userId=" + friendId)
          setUser(res.data)

        }catch(error){
          console.log(error)
        }
      }
      getUser()
   },[currentUser,conversation])
  return (
    <div className="containerConversation">
      <div className="conversation">
         <img className="conversationImage" src={user?.profilePicture ? user.profilePicture : PF + "person/avatar.jpeg"} alt="profil" /> 

          <span className="conversationName"> {user?.userName}</span>   
        <div className="conversationBadge"></div>
      </div>
    </div>
  );
}
export default Conversation;
