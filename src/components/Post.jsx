import { useState, useEffect } from 'react';
import PostHeader from './PostHeader';
import { FaThumbsUp, FaComment, FaRetweet, FaShareAlt } from 'react-icons/fa';
import { db ,auth } from '../Firebase/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'; // Firestore functions

const Post = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [reposts, setReposts] = useState(0);
    const [shares, setShares] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [commentBoxVisible, setCommentBoxVisible] = useState(false);
    const userId = auth.currentUser.displayName;
    // Fetch post interactions from Firestore on mount
    useEffect(() => {
        const fetchPostInteractions = async () => {
            const postRef = doc(db, 'startuppostlikes', post.id);
            const postSnap = await getDoc(postRef);

            if (postSnap.exists()) {
                const data = postSnap.data();
                setLikes(data.likes || 0);
                setComments(data.comments || []);
                setReposts(data.reposts || 0);
                setShares(data.shares || 0);
            }
        };

        fetchPostInteractions();
    }, [post.id]);

    // Like button handler
    const handleLike = async () => {
        const postRef = doc(db, 'startuppostlikes', post.id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const data = postSnap.data();
            if (!data.likedBy || !data.likedBy.includes(userId)) {
                await updateDoc(postRef, {
                    likes: data.likes + 1,
                    likedBy: [...(data.likedBy || []), userId],
                });
                setLikes(likes + 1);
            } else {
                console.log('Already liked by this user.');
            }
        } else {
            await setDoc(postRef, {
                likes: 1,
                likedBy: [userId],
                comments: [],
                reposts: 0,
                shares: 0,
            });
            setLikes(1);
        }
    };

    // Comment button handler
    const handleComment = () => {
        setCommentBoxVisible(!commentBoxVisible);
    };

    // Post a new comment to Firestore
    const postComment = async () => {
        if (newComment.trim() === '') return;

        const postRef = doc(db, 'startuppostlikes', post.id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const data = postSnap.data();
            const updatedComments = [...(data.comments || []), { userId, text: newComment }];
            await updateDoc(postRef, { comments: updatedComments });
            setComments(updatedComments);
        } else {
            await setDoc(postRef, {
                likes: 0,
                likedBy: [],
                comments: [{ userId, text: newComment }],
                reposts: 0,
                shares: 0,
            });
            setComments([{ userId, text: newComment }]);
        }

        setNewComment('');
    };

    // Repost button handler
    const handleRepost = async () => {
        const postRef = doc(db, 'startuppostlikes', post.id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const data = postSnap.data();
            await updateDoc(postRef, { reposts: data.reposts + 1 });
            setReposts(reposts + 1);
        }
    };

    // Share button handler
    const handleShare = async () => {
        const postRef = doc(db, 'startuppostlikes', post.id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const data = postSnap.data();
            await updateDoc(postRef, { shares: data.shares + 1 });
            setShares(shares + 1);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <PostHeader profileImage={post.startupProfileImage} name={post.startupName} time={post.createdAt} />
            </div>

            {/* Post content */}
            <p className="mt-4">{post.content}</p>

            {/* Conditionally render the post image if it exists */}
            {post.imageUrl && (
                <div className="mt-4">
                    <img src={post.imageUrl} alt="Post media" className="w-full max-w-md h-auto rounded-lg shadow-md" />
                </div>
            )}

            {/* Interaction buttons */}
            <div className="flex justify-around mt-4">
                {/* Like button */}
                <button className="flex items-center space-x-2 text-blue-500" onClick={handleLike}>
                    <FaThumbsUp />
                    <span>Like ({likes})</span>
                </button>

                {/* Comment button */}
                <button className="flex items-center space-x-2 text-blue-500" onClick={handleComment}>
                    <FaComment />
                    <span>Comment ({comments.length})</span>
                </button>

                {/* Repost button */}
                <button className="flex items-center space-x-2 text-blue-500" onClick={handleRepost}>
                    <FaRetweet />
                    <span>Repost ({reposts})</span>
                </button>

                {/* Share button */}
                <button className="flex items-center space-x-2 text-blue-500" onClick={handleShare}>
                    <FaShareAlt />
                    <span>Share ({shares})</span>
                </button>
            </div>

            {/* Comment input box */}
            {commentBoxVisible && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full border rounded-lg p-2"
                    />
                    <button
                        onClick={postComment}
                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
                    >
                        Post Comment
                    </button>
                </div>
            )}

            {/* Display Comments */}
            {comments.length > 0 && (
                <div className="mt-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="border-t pt-2 mt-2">
                            <p>
                                <strong> {comment.userId}:</strong> {comment.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
