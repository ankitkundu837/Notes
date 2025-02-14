
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
export default function Editnote() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    if (!cookies.token)
      navigate('/loginpage');
  }, []);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      };

      try {
        const response = await fetch(`http://localhost:8001/note/${noteId}`, requestOptions);

        if (response.ok) {
          const result = await response.json();
          setNotes(result);
        } else {
          console.error('Failed to fetch notes:', response.status);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();

  }, []);
  async function formSubmit(formData) {
    // const body = {
    //     title: formData.get('title'),
    //     body: formData.get('body'),
    //     label: formData.get('label')
    // }
    // const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    // const requestOptions = {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
    //   body: formBody
    // }
    // try {
    //   const response = await fetch(
    //     'http://localhost:8001/note', requestOptions)
    //     const result = await response.json()
    //     console.log(result.token)
    //     // setCookie(result.token)
    //     if(!result.sucess)
    //       throw result
    //     navigate('/notepage');
    // }
    // catch (error) {
    // console.error(error);
    // }
  };

  return (
    <>
      <div className='container'>
        <form action={formSubmit}>
          <h1>Edit Note</h1>
          <div className='input-box'>
            <input type='text' placeholder='Title...' name='title' defaultValue={notes.title}required />
          </div>
          <div className='input-box2'>
            <textarea type='textarea' placeholder='Note..' name='body' defaultValue={notes.body} required />
          </div>
          <div className='input-box3'>
            <input type='text' placeholder='Label...' name='label' defaultValue={notes.label}/>
          </div>
          <div className='login-button'>
            <button name='rememberMe'><span>Edit</span></button>
          </div>

        </form>
      </div>

    </>
  )
}