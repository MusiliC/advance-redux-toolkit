import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";

const PostsExercpt = ({ post }) => {
  return (
    <div className="border p-4 mb-2  md:w-3/4 mx-auto rounded-md ">
      <h1 className=" font-semibold">{post.title}</h1>
      <div className="my-1">
        <div>
          <Link
            className="text-blue-500 font-semibold underline "
            to={`post/${post.id}`}
          >
            View Post({post.id})
          </Link>
        </div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>

      <h1 className="text-sm">{post.body.substring(0, 75)}...</h1>
      <div className="my-2 ">
        <ReactionButton post={post} />
      </div>
    </div>
  );
};

export default PostsExercpt;
