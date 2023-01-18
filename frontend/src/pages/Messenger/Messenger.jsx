import {
  Search,
  ExitToAppRounded,
  Send,
  PhotoCamera,
  Group,
  EmojiEmotions,
} from "@material-ui/icons";
import { AiOutlineMessage } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import { NavLink } from "react-router-dom";

import Conversation from "../../composant/conversation/Conversation";
import Message from "../../composant/message/Message";
import Topbar from "../../composant/topbar/Topbar";
import "./Messenger.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { io } from "socket.io-client";
function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [hideConversation, setHideConversation] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [socket, setSocket]=useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const { user } = useContext(AuthContext);
  console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    socket.current = io("ws://localhost:8001");
    socket.current.on("getMessage", (data) => {
      console.log("########", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(socket);

  useEffect(() => {
    //avoids the display of a message sent by another person can be displayed while you are talking with another person
    // arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&& setArrivalMessage([...messages,arrivalMessage]);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  console.log(arrivalMessage);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUser", (users) => {
      console.log(users);
    });
  }, [user]);
  // console.log(socket);

  // useEffect(()=>{
  //   socket?.on("welcome",message=>{
  //     console.log(message);
  //   });
  // },[socket]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      console.log(res.data);
      setNewMessage("");
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleClick = () => {
    setShowEmoji(!showEmoji);
  };

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
              <div>
                <NavLink to="/registedUsers">
                  <Group
                    className="chatOnlineUser"
                    onClick={() => setHideConversation(!hideConversation)}
                  />
                </NavLink>
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
                // eslint-disable-next-line react/jsx-key
                <div key={key} onClick={() => setCurrentChat(conversation)}>
                  <Conversation
                    conversation={conversation}
                    currentUser={user}
                  />
                </div>
              ))}
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

                  {messages.map((message, key) => (
                    // eslint-disable-next-line react/jsx-key
                    <div ref={scrollRef} key={key}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
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
                    <div>
                      <PhotoCamera className="chatPhotoCamera" />

                      <EmojiEmotions onClick={() => handleClick()} />
                    </div>
                    <div className="emojiContainer">
                      {showEmoji && <EmojiPicker />}
                    </div>
                  </div>

                  <button className="chatSubmitButton" onClick={handleSubmit}>
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
