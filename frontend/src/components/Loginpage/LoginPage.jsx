
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import {  useEffect } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        if(cookies.token)
          navigate('/notepage');
      },[]);
  async function formSubmit(formData) {
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
      
    }
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
      body: formBody
    }
    try {
      const response = await fetch(
        'http://localhost:8001/user/signin', requestOptions)
        const result = await response.json()
        console.log(result.token)
        // setCookie(result.token)
        if(!result.sucess)
          throw result
        navigate('/notepage');
    }
    catch (error) {
    console.error(error);
    }
  };

  return (
    <>
      <div className='container'>
        <form action={formSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='email' placeholder='Email' name='email' required />
            <FaUser className="icon" />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' name='password' required />
            <FaLock className="icon" />
          </div>
          <div className='remember-box'>
            <label>
              <input type='checkbox' name='rememberMe' />
              Remember me</label>
            <a href='/reset'>Forgot Password?</a>
          </div>
          <div className='login-button'>
            <button name='rememberMe'><span>Login</span></button>
          </div>
          <div className='register'>
            <p>Don't have an account? <Link to='/signuppage'>Register</Link></p>
          </div>
        </form>
      </div>

    </>
  )
}