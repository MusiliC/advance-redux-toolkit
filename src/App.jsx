import { useState } from "react";
import PostList from "./features/post/PostList";
import AddPost from "./features/post/AddPost";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "./features/post/SinglePostPage";
import EditPost from "./features/post/EditPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPost />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
