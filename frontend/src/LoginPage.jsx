
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom"

export default function LoginPage() {
  function formSubmit()
  {
  }
  return (
    <>
    <div className='container'>
      <form action={formSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' name='username' required/>
          <FaUser className="icon"/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' name='password' required/>
          <FaLock className="icon"/>
        </div>
        <div className='remember-box'>
          <label>
          <input type='checkbox' name='rememberMe'/>
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