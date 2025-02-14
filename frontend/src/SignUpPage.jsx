
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom"

export default function SignUpPage() {
  function formSubmit()
  {
  }
  return (
    <>
    <div className='container'>
      <form action={formSubmit}>
        <h1>Sign Up</h1>
        <div className='input-box'>
          <input type='email' placeholder='Email' name='email' required/>
          <MdOutlineAlternateEmail  className="icon-email"/>
        </div>
        <div className='input-box'>
          <input type='text' placeholder='Username' name='username' required/>
          <FaUser className="icon"/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' name='password' required/>
          <FaLock className="icon"/>
        </div>
        <div className='login-button'>
          <button name='rememberMe'><span>Sign Up</span></button>
        </div>
        <div className='login'>
          <p>Have an account? <Link to='/loginpage'>Login</Link></p>
        </div>
      </form>
    </div>

    </>
  )
}