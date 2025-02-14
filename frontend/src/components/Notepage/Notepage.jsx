import Navbar from "../NavbarNotePage"
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
                const response = await fetch('http://localhost:8001/', requestOptions);

                if (response.ok) {
                    const result = await response.json();
                    setNotes(result);
                    console.log(notes)
                } else {
                    console.error('Failed to fetch notes:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();

    }, []);
    return (
        <>
            <Navbar />
            <h1>Notes</h1>
            {notes && Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                        <h3>{note.title}</h3>
                        <p>{note.body}</p>
                    </div>
                ))
            ) : (
                <p>No notes available or failed to fetch data.</p>
            )}
        </>
    )
}