import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  //retrieve post id

  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  return (
    <section className="w-full py-10">
      <div className="w-5/6 mx-auto">
        {post ? (
          <div className="border p-4 mb-2  md:w-3/4 mx-auto rounded-md ">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <h2 className="my-2">{post.body}</h2>
            <div className="my-2">
               <div>
          <Link
            className="text-blue-500 font-semibold underline "
            to={`/post/edit/${post.id}`}
          >
            Edit Post({post.id})
          </Link>
        </div>
              <PostAuthor userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButton post={post} />
          </div>
        ) : (
          <div>
            <p className="text-xl font-semibold text-center">Not post found </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePostPage;
