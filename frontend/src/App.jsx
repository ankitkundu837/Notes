import LoginPage from './LoginPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import Homepage from './Homepage.jsx'
import { Route ,Routes,useLocation } from "react-router-dom"
import { useEffect } from "react";

export default function App() {
  return (
    <>
      <DynamicStyles/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/signuppage" element={<SignUpPage/>}/>
      </Routes>
    </>
  )
}

function DynamicStyles() {
  const location = useLocation();

  useEffect(() => {
    const stylesMap = {
      "/": "/src/Homepage.css",
      "/loginpage": "/src/Loginpage.css",
      "/signuppage": "/src/SignUpPage.css",
      "/todolist": "/styles/ToDoList.css",
    };

    const currentStyle = stylesMap[location.pathname];

    if (currentStyle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = currentStyle;
      link.id = "dynamic-style";
      document.head.appendChild(link);
    }

    return () => {
      const existingLink = document.getElementById("dynamic-style");
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, [location.pathname]);

  return null;
}