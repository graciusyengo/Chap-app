function UsersInscrits({ user }) {
  console.log("yes yes", user);

  // console.log(conversation)
  // console.log(user.profilePicture)

  return (
    <div className="containerConversation">
      <div className="conversation">
        <img className="conversationImage" />

        <span className="conversationName">{user.userName}</span>
        <div className="conversationBadge"></div>
      </div>
    </div>
  );
}
export default UsersInscrits;
