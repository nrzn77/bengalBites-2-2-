import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc, getDoc, arrayUnion, arrayRemove, increment, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
    const [postList, setPostList] = useState([]);
    const [filterHashtag, setFilterHashtag] = useState(null);
    isAuth = localStorage.getItem("isAuth");

    useEffect(() => {
        const getPosts = async () => {
            try {
                let q = collection(db, "cookings");
                if (filterHashtag) {
                    q = query(q, where("hashtags", "array-contains", filterHashtag));
                }
                const querySnapshot = await getDocs(q);
                const posts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPostList(posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();
    }, [filterHashtag]);

    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, "cookings", id));
            setPostList(postList.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpvote = async (id) => {
        try {
            const postDocRef = doc(db, "cookings", id);
            const postDocSnapshot = await getDoc(postDocRef);
            const postData = postDocSnapshot.data();

            if (postData.upvotedBy && postData.upvotedBy.includes(auth.currentUser.uid)) {
                console.log("User has already upvoted this post");
                return;
            }

            await updateDoc(postDocRef, {
                likecount: increment(1),
                upvotedBy: arrayUnion(auth.currentUser.uid),
                downvotedBy: arrayRemove(auth.currentUser.uid)
            });

            const updatedPostSnapshot = await getDoc(postDocRef);
            const updatedPostData = { id: updatedPostSnapshot.id, ...updatedPostSnapshot.data() };
            setPostList(postList.map(post => post.id === id ? updatedPostData : post));
        } catch (error) {
            console.error("Error upvoting post:", error);
        }
    };

    const handleDownvote = async (id) => {
        try {
            const postDocRef = doc(db, "cookings", id);
            const postDocSnapshot = await getDoc(postDocRef);
            const postData = postDocSnapshot.data();

            if (postData.downvotedBy && postData.downvotedBy.includes(auth.currentUser.uid)) {
                console.log("User has already downvoted this post");
                return;
            }

            await updateDoc(postDocRef, {
                likecount: increment(-1),
                downvotedBy: arrayUnion(auth.currentUser.uid),
                upvotedBy: arrayRemove(auth.currentUser.uid)
            });

            const updatedPostSnapshot = await getDoc(postDocRef);
            const updatedPostData = { id: updatedPostSnapshot.id, ...updatedPostSnapshot.data() };
            setPostList(postList.map(post => post.id === id ? updatedPostData : post));
        } catch (error) {
            console.error("Error downvoting post:", error);
        }
    };

    const handleHashtagClick = (hashtag) => {
        setFilterHashtag(hashtag);
    };

    return (
        <div className="homePage">
            {postList.length > 0 ? (
                postList.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="postHeader">
                            <div className="title">
                                <h1>{post.title}</h1>
                            </div>
                            <div className="deletePost">
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <button onClick={() => deletePost(post.id)}>
                                        &#128465;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="postTextContainer">
                            {post.postText.split(" ").map((word, index) =>
                                word.startsWith("#") ? (
                                    <span key={index} className="hashtag" onClick={() => handleHashtagClick(word.slice(1))}>
                                        {word}{" "}
                                    </span>
                                ) : (
                                    <span key={index}>{word} </span>
                                )
                            )}
                        </div>
                        <h3>@{post.author.name}</h3>
                        {isAuth && (
                            <div className="voteButtons">
                                <button onClick={() => handleUpvote(post.id)}>&#x2B06;</button>
                                <span>{post.likecount}</span>
                                <button onClick={() => handleDownvote(post.id)}>&#x2B07;</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
        </div>
    );
}

export default Home;
