import React from "react";
import { useSelector} from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,

} from "./postSlice";
import PostsExercpt from "./PostsExercpt";

const PostList = () => {

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // useEffect(() => {
  //   if (postsStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postsStatus, dispatch]);



  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="w-full  py-8">
      <div className="w-5/6 mx-auto my-2">
        <p className="font-semibold text-3xl mb-4 text-center">Posts..</p>
      </div>
      <div className="w-5/6 mx-auto">
        {postsStatus === "loading" ? (
          <p className="text-xl font-semibold text-center my-4">Loading...</p>
        ) : postsStatus === "failed" ? (
          <div>
            <p className="text-xl font-semibold text-center my-4"> {error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {orderedPosts.map((post) => (
              <PostsExercpt post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;
