import React, {useEffect, useState} from 'react';
import '../../assets/sass/comments.css';
import Rating from "../elements/Rating";
import { useNavigate } from "react-router-dom";

export default function CommentSection({sitterId}) {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        // Fetch users
        const fetchUsers = fetch('http://localhost:8000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });

        // Fetch comments related to sitter
        const fetchComments = fetch(`http://localhost:8000/comments?sitterId=${sitterId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });

        Promise.all([fetchUsers, fetchComments])
            .then(([usersData, commentsData]) => {

                setUsers(usersData);
                setComments(commentsData);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [sitterId]);

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Error loading comments: {error.message}</div>;

    return (
        <div className="comment-section">
            <h3>Comments</h3>

            {comments.map(comment => {
                const user = users.find(user => String(user.id) === String(comment.userId));
                return (
                    <div className="comment-container" key={comment.id}>
                        {user ? (
                            <>
                                <div className="comment-photo"><img src={user.basicInfo.photo} alt="avatar"/></div>
                                <div className="comment-details">
                                    <div className="comment-header">
                                        <div
                                            className="commenter-name">{user.basicInfo.name} {user.basicInfo.surname}</div>
                                        <div className="comment-date">{comment.date}</div>
                                    </div>
                                    <div className="comment-rate"><Rating ratings={comment.rate}/></div>
                                    <div className="comment-description">{comment.text}</div>
                                </div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => navigate(`/sitter/${user.id}`)
                                    }
                                ><i className="fa-solid fa-id-card"></i></button>
                            </>
                        ) : (
                            <div className="comment-details">
                                <div className="comment-header">
                                    <div className="commenter-name">Unknown User</div>
                                    <div className="comment-date">{comment.date}</div>
                                </div>
                                <div className="comment-rate">****</div>
                                <div className="comment-description">{comment.text}</div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
