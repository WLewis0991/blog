import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import SplashPage from "./pages/Splash";
import PostPage from "./pages/PostPage";

function App() {


  return (
    <><div className="bg-bg-void min-h-screen w-full">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>     
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
