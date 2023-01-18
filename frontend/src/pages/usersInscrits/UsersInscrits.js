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
import Message from "../../composant/message/Message";
import Topbar from "../../composant/topbar/Topbar";
import UsersInscrits from "../../composant/usersinscrits/UsersInscrit";
import { useContext } from "react";
import "./usersinscrits.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { io } from "socket.io-client";
import { useNavigate, NavLink } from "react-router-dom";
export default function UserInscrit() {
  const [usersInscrits, setUsersLists] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [hideConversation, setHideConversation] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  // const [socket, setSocket]=useState(null);

  const textAreaRef = useRef();
  const socket = useRef();
  const useFile = useRef();
  const { user } = useContext(AuthContext);

  console.log("#### Mon utilisateur", user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(socket);

  useEffect(() => {
    const getListUsers = async () => {
      try {
        const res = await axios.get("users/");
        setUsersLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListUsers();
  }, []);

  const handleClick = () => {
    setShowEmoji(!showEmoji);
  };
  const onEmojiClick = (e) => {
    // console.log(e.emoji);
    setNewMessage((prevTextArea) => prevTextArea + e.emoji);
    setShowEmoji(false);
    textAreaRef.current.focus();
  };

  const handleClickDeconnected = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleFile = () => {
    useFile.current.click();
  };

  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatOnline">
          <div className="chatOnlineWraper">
            <img
              className="chatOnlineImage"
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : PF + "person/avatar.jpeg"
              }
              alt="person"
            />
            <div className="chatOnlineIcon">
              <NavLink to="/conversations-recents">
                <div className="chatOnlineMessage">
                  <AiOutlineMessage className="messageIcon" />
                </div>
              </NavLink>
              <NavLink className="navLink" to="/users-inscrit">
                <div>
                  <Group
                    className="chatOnlineUser"
                    onClick={() => setHideConversation(!hideConversation)}
                  />
                </div>
              </NavLink>
              <ExitToAppRounded
                className="chatOnlineLogout"
                onClick={handleClickDeconnected}
              />
            </div>
          </div>
        </div>
        <div className="chatMenus">
          <div className="searchFriendsContainer">
            <Search className="searchIconFriend" />
            <input
              type="text"
              placeholder="Search your friends"
              className="chatMenusInput"
            />
          </div>
          <div className="chatMenusWraper">
            <h1 className="chatRecent">List of friends</h1>
            <div className="containerConversation">
              <div className="usersinscrits">
                {usersInscrits.map((user, key) => (
                  <UsersInscrits user={user} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWraper">
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

                <>
                  <div>
                    <Message />
                  </div>
                  <div>
                    <img alt="imageSend" />
                  </div>
                </>
              </div>
              <div className="chatBoxBottom">
                <div className="chatContainerInput">
                  <textarea
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    ref={textAreaRef}
                  ></textarea>
                  <div>
                    <input
                      type="file"
                      accept="image/png,jpeg,jpg"
                      name="searchImageToSend"
                      className="searchImageToSend"
                      style={{ display: "none" }}
                      ref={useFile}
                    />
                    <PhotoCamera
                      className="chatPhotoCamera"
                      onClick={handleFile}
                    />

                    <EmojiEmotions
                      className="emojiIcon"
                      onClick={() => handleClick()}
                    />
                  </div>
                  <div className="emojiContainer">
                    {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
                  </div>
                </div>
                <button className="chatSubmitButton">
                  <Send className="sendIcon" />
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
