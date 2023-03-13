import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPostById, updatePost, deletePost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice.js";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
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
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
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

  //delete

  const onDeletePost = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <section className="w-full">
      <div className="w-5/6 mx-auto">
        {post ? (
          <>
            <div className="my-4">
              <h1 className="text-center text-2xl">Edit Post</h1>
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
                  defaultValue={userId}
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
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                  >
                    Save Post
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-400  font-semibold text-white px-5 py-2  hover:bg-blue-800;"
                    onClick={onDeletePost}
                    disabled={!canSave}
                  >
                    Delete Post
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xl font-semibold text-center">No post Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditPost;
