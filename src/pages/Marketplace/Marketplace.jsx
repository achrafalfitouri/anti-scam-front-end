import React from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserProvider";
import "./Marketplace.css";
import { Post } from "../../components/Post/Post";
import { usePosts } from "../../contexts/PostsProvider";
import { Header } from "../../components/Header/Header";
import { Discover } from "../../components/Discover/Discover";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthProvider";

export const Marketplace = () => {
  const { allPosts, postLoading } = usePosts();
  const { auth } = useAuth();

  const { loggedInUserState } = useLoggedInUser();

  const allMarketplaceedPosts = allPosts?.filter((post) =>
    loggedInUserState?.bookmarks?.find((postId) => postId === post?._id)
  );
  return (
    <>
      {" "}
      {auth.isAuth && <Header />}
      <div className="app-container">
        {auth.isAuth && <Navbar />}

        <main className="feed Marketplace-container">
          {!postLoading &&
            (allMarketplaceedPosts.length ? (
              allMarketplaceedPosts?.map((post) => (
                <Post post={post} key={post?._id} />
              ))
            ) : (
              <p className="no-Marketplaces">You have not added any Marketplaces!</p>
            ))}
        </main>

        
      </div>
    </>
  );
};
