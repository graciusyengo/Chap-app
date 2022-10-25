import {
  Search,
  ExitToAppRounded,
  Send,
  PhotoCamera,
} from "@material-ui/icons";
import { AiOutlineMessage } from "react-icons/ai";
import React from "react";
import Conversation from "../../composant/conversation/Conversation";
import Message from "../../composant/message/Message";
import Topbar from "../../composant/topbar/Topbar";
import "./Messenger.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef= useRef()
  const { user } = useContext(AuthContext);
  console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);
  console.log(currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit= async(e)=>{
    e.preventDefault()
    const message={
      sender:user._id,
     
      text: newMessage,
      conversationId: currentChat._id,
    }

    try {
      const res= await axios.post("/messages",message)
      setMessages([...messages,res.data])
      setNewMessage("")
      
    } catch (error) {
      
    }
  
  }
  useEffect(()=>{

    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatOnline">
          <div className="chatOnlineWraper">
            <img
              className="chatOnlineImage"
              src={PF + "person/avatar.jpeg"}
              alt="person"
            />
            <div className="chatOnlineIcon">
              <div className="chatOnlineMessage">
                <AiOutlineMessage className="messageIcon" />
              </div>
              <ExitToAppRounded className="chatOnlineLogout" />
            </div>
          </div>
        </div>
        <div className="chatMenus">
          <div className="chatMenusWraper">
            <div className="searchFriendsContainer">
              <Search className="searchIconFriend" />
              <input
                type="text"
                placeholder="Search your friends"
                className="chatMenusInput"
              />
            </div>
            <div className="containerConversation">
              {conversations.map((conversation, key) => (
                <div onClick={() => setCurrentChat(conversation)}>
                  <Conversation
                    conversation={conversation}
                    currentUser={user}
                  />
                </div>
              ))}

              {/* <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation /> */}
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWraper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div className="chatBoxInfo">
                    <img src={PF + "person/avatar.jpeg"} alt="profil" />
                    <div className="chatBoxContainerName">
                      <span className="chatBoxName"> Gracius </span>
                      <span className="chatBoxNameOnline"> online</span>
                    </div>

                    <span></span>
                  </div>
                 
                  {messages.map((message,key) => (
                    <div  ref={scrollRef}>
                        <Message
                      message={message}
                      own={message.sender === user._id} key={key}
                    />
               
                    </div>
                  
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <div className="chatContainerInput">
                    <textarea
                      className="chatMessageInput"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <PhotoCamera className="chatPhotoCamera" />
                  </div>
                  <button className="chatSubmitButton"  onClick={handleSubmit}>
                    <Send className="sendIcon" />
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                
                OPEN CONVERSATION TO START CHAT
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Messenger;
