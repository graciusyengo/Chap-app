import "./Home.css";
// import Topbar from "../../composant/topbar/Topbar";
import Sidebar from "../../composant/sidebar/Sidebar";
import Feed from "../../composant/feed/Feed";
import Rightbar from "../../composant/rightbar/Rightbar";




function Home() {
 

  return (
    <>
      {/* <Topbar /> */}
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
