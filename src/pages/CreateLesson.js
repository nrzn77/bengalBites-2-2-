import React from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import "./CreatePost.css"

const CreateLesson = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      course,
      postText,
    });
    navigate("../");
  };

  
  return (
    <div className="createPostPage">
    <div className="cpContainer">
      <h1>Create Lesson</h1>
      <div className="inputGp">
        <label> Title:</label>
        <input
          placeholder="Title..."
          onChange={(e)=>{setTitle(e.target.value)}}
        />
      </div>
      <div className="inputGp">
        <label> Course:</label>
        <input
          placeholder="Course..."
          onChange={(e)=>{setCourse(e.target.value)}}
        />
      </div>
      <div className="inputGp">
        <label> Post:</label>
        <textarea
          placeholder="Post..."
          onChange={(e)=>{setPostText(e.target.value)}}
        />
      </div>
      <button onClick={createPost}> Submit Post</button>
    </div>
  </div>
);

}

export default CreateLesson