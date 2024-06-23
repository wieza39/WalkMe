import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SitterInfo from "../components/profile/sitterProfile/SitterInfo";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/sass/sitterProfile.css';
import CommentSection from "../components/profile/CommentSection";


export default function SitterProfileInfo() {

    const { id } = useParams();
    const [sitter, setSitter] = useState({
        id: "",
        username: "",
        password: "",
        basicInfo: {},
        roles: [],
        pets: [],
        sitterInfo: {}
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSitter(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <>
            <Navbar />
                <SitterInfo sitter={sitter} />
                <CommentSection sitterId={id} />
            <Footer />
        </>


    )

}