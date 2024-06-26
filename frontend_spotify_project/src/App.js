import "./App.css";
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import UploadSong from "./routes/UploadSong";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import {useCookies} from "react-cookie";
import MyMusic from "./routes/MyMusic";
import songContext from "./context/songContext";
import { useState } from "react";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
function App() {
  const[soundPlayed,setSoundPlayed]=useState(null);
  const[isPaused,setIsPaused] = useState(true);
  const[currentSong,setCurrentSong]=useState(null);
  const[cookie,setCookie]=useCookies(["token"]);
  return (
    <div className="w-screen h-screen font-poppins">
    <BrowserRouter>
    {cookie.token ? ( 
      <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}}>
      <Routes>
        <Route path="/" element={<LoggedInHomeComponent/>}/>
        <Route path="/home" element={<LoggedInHomeComponent/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/uploadSong" element={<UploadSong/>}/>  
        <Route path="/myMusic" element={<MyMusic/>}/>   
        <Route path="/search" element={<SearchPage/>}/>     
        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes> 
      </songContext.Provider>
    ):(
      <Routes>
      <Route path="/login" element={<LoginComponent/>}/>
      <Route path="/signup" element={<SignupComponent/>}/>
      <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    )
    }
    </BrowserRouter>
    </div>
   
    
  );
}

export default App;