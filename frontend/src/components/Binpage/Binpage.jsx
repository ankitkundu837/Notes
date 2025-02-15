import Navbar from "../NavbarNotePage"
import Card from "../Card"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
export default function LoginPage() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        if (!cookies.token)
            navigate('/login');
    }, []);

    const [notes, setNotes] = useState([{}]);

    useEffect(() => {
        const fetchNotes = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            };

            try {
                const response = await fetch('http://localhost:8001/getlabel/bin', requestOptions);

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

    }, [notes]);
    return (
        
        <>
            <Navbar />
            <h1>Notes</h1>
            <div style={{
          display: 'none'}}><Card /></div>
            
            {notes && Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note, index) => (
                    <>
                    <Card title={note.title} _id={note._id} setNotes={setNotes}/>
                    </>
                ))
            ) : (
                <p>No notes available or failed to fetch data.</p>
            )}
        </>
    )
}