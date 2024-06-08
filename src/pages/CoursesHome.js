import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import "./Courses.css";

function AllLessons({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const course = searchParams.get('course');

  useEffect(() => {
    const getPosts = async () => {
      let q;
      if (course) {
        q = query(collection(db, "posts"), where("course", "==", course));
      } else {
        q = collection(db, "posts");
      }
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [course]); // add `course` as a dependency to the useEffect hook

  const deletePost = async (id) => {
    try{
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      setPostList(postLists.filter((post) => post.id !== id));
    }
    catch(err){
      console.error("Error deleting lesson:", err);
    }
  };

  if (course) {
    return (
      <div className="homePage">
        {postLists.map((post, index) => (
          <div className="post" key={index}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {localStorage.getItem("isAdmin") && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            {post.course && <h1>{post.course}</h1>}
            <ReactMarkdown>{post.postText}</ReactMarkdown>
          </div>
        ))}
      </div>
    );
  }
  else {
    return <h1>Select a proper course</h1>;
  }
}

export default AllLessons;
