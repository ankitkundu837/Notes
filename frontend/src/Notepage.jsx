import Navbar from "./components/NavbarNotePage"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react";
export default function LoginPage() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        if (!cookies.token)
            navigate('/login');
    }, []);
    return (
        <>
            <Navbar />
        </>
    )
}