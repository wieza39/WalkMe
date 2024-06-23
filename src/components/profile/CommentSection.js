import React, {useEffect, useState} from 'react';
import '../../assets/sass/comments.css'

export default function CommentSection({sitterId}) {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // Fetch users
        const fetchUser = fetch(`http://localhost:8000/users`)
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

        Promise.all([fetchUser, fetchComments])
            .then(([sitterData, commentsData]) => {
                setUsers(sitterData);
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
                const user = users.find((user) => user.id === comment.id);
                return (
                    <div className="comment-container" key={comment.id}>
                        <div className="comment-photo"><img src={user.basicInfo.photo} alt='avatar'/></div>
                        <div className="comment-details">
                            <div className="comment-header">
                                <div className="commenter-name">{user.basicInfo.name} {user.basicInfo.surname}</div>
                                <div className="comment-date">{comment.date}</div>
                            </div>
                            <div className="comment-rate">****</div>
                            <div className="comment-description">{comment.text}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
