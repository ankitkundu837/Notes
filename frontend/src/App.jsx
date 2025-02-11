import LoginPage from './LoginPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import {Route ,Routes} from "react-router-dom"
export default function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<LoginPage/>}/>
      <Route path="/loginpage" element={<LoginPage/>}/>
      <Route path="/signuppage" element={<SignUpPage/>}/>
    </Routes>
    </>
  )
}