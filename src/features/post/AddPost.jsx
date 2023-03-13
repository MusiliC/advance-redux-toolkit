import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice.js";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="w-full">
      <div className="w-5/6 mx-auto">
        <div className="my-4">
          <h1 className="text-center text-2xl">Add Posts</h1>
        </div>
        <div className="md:w-1/2 mx-auto">
          <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
              type="text"
              className="inputStyles"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor="postAuthor">Author:</label>
            <select
              id="postAuthor"
              className="inputStyles"
              value={userId}
              onChange={onAuthorChanged}
            >
              <option value=""></option>
              {usersOptions}
            </select>
            <label htmlFor="postContent">Content:</label>
            <textarea
              className="inputStyles"
              id="postContent"
              name="postContent"
              value={content}
              onChange={onContentChanged}
            />
            <button
              type="button"
              className="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddPost;
