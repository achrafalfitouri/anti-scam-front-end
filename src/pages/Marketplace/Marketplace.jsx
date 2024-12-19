import React, { useEffect, useState } from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserProvider";
import "./Marketplace.css";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthProvider";
import { Card } from "antd";
import MarketplaceModal from "../../components/MarketplaceModal/MarketplaceModal";
import MarketplaceItem from "./MarketplaceItem/MarketplaceItem";
import { Loader } from "../../components/Loader/Loader";

export const Marketplace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { Meta } = Card;
  const { loggedInUserState } = useLoggedInUser();
  const [IsOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({});

  const staticPosts = [
    {
      id: 1,
      images: [
        "https://via.placeholder.com/200x150?text=Post+1+Image+1",
        "https://via.placeholder.com/200x150?text=Post+1+Image+2",
      ],
      description: "Explore amazing products in Post 1!",
    },
    {
      id: 2,
      images: [
        "https://via.placeholder.com/200x150?text=Post+2+Image+1",
        "https://via.placeholder.com/200x150?text=Post+2+Image+2",
      ],
      description: "Check out Post 2 for something special.",
    },
    {
      id: 3,
      images: [
        "https://via.placeholder.com/200x150?text=Post+3+Image+1",
        "https://via.placeholder.com/200x150?text=Post+3+Image+2",
      ],
      description: "Post 3 has incredible deals waiting for you.",
    },
    {
      id: 4,
      images: [
        "https://via.placeholder.com/200x150?text=Post+4+Image+1",
        "https://via.placeholder.com/200x150?text=Post+4+Image+2",
      ],
      description: "Discover new items in Post 4 today!",
    },
    {
      id: 5,
      images: [
        "https://via.placeholder.com/200x150?text=Post+5+Image+1",
        "https://via.placeholder.com/200x150?text=Post+5+Image+2",
      ],
      description: "Find your favorites in Post 5.",
    },
    {
      id: 6,
      images: [
        "https://via.placeholder.com/200x150?text=Post+6+Image+1",
        "https://via.placeholder.com/200x150?text=Post+6+Image+2",
      ],
      description: "Exciting offers await in Post 6.",
    },
    {
      id: 7,
      images: [
        "https://via.placeholder.com/200x150?text=Post+7+Image+1",
        "https://via.placeholder.com/200x150?text=Post+7+Image+2",
      ],
      description: "Explore exclusive deals in Post 7.",
    },
    {
      id: 8,
      images: [
        "https://via.placeholder.com/200x150?text=Post+8+Image+1",
        "https://via.placeholder.com/200x150?text=Post+8+Image+2",
      ],
      description: "Post 8 brings you the best in class.",
    },
    {
      id: 9,
      images: [
        "https://via.placeholder.com/200x150?text=Post+9+Image+1",
        "https://via.placeholder.com/200x150?text=Post+9+Image+2",
      ],
      description: "Discover the latest in Post 9.",
    },
    {
      id: 10,
      images: [
        "https://via.placeholder.com/200x150?text=Post+10+Image+1",
        "https://via.placeholder.com/200x150?text=Post+10+Image+2",
      ],
      description: "Unbeatable offers in Post 10.",
    },
    {
      id: 11,
      images: [
        "https://via.placeholder.com/200x150?text=Post+11+Image+1",
        "https://via.placeholder.com/200x150?text=Post+11+Image+2",
      ],
      description: "Unbeatable offers in Post 11.",
    },
    {
      id: 12,
      images: [
        "https://via.placeholder.com/200x150?text=Post+12+Image+1",
        "https://via.placeholder.com/200x150?text=Post+12+Image+2",
      ],
      description: "Unbeatable offers in Post 12.",
    },
  ];

  useEffect(() => {
    if (staticPosts.length) {
      setIsLoading(true);
      console.log("Posts are loading:", true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Posts loaded:", false);
      }, 2000);
    }
  }, [staticPosts.length]);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const toggleModal = (id, isOpen) => {
    setIsModalOpen((prev) => ({ ...prev, [id]: isOpen }));
  };

  return (
    <>
      {" "}
      {auth.isAuth && <Header />}
      <div className="app-container">
        {auth.isAuth && <Navbar />}

        <main className="marketplace-container">
          {isLoading ? (
            <div className="loading-spinner">
              <Loader />
            </div>
          ) : staticPosts.length ? (
            <div className="marketplace-grid">
              {staticPosts.map((post) => (
                <div key={post.id}>
                  <Card
                    onClick={() => toggleModal(post.id, true)}
                    hoverable
                    style={{
                      width: 240,
                      backgroundColor: "rgb(37, 38, 39)",
                      color: "white",
                    }}
                    cover={<img alt={`Post ${post.id}`} src={post.images[0]} />}
                  >
                    <Meta
                      title={
                        <span style={{ color: "white" }}>
                          Europe Street beat
                        </span>
                      }
                      description={
                        <span style={{ color: "white" }}>
                          {post.description}
                        </span>
                      }
                    />
                  </Card>

                  <MarketplaceItem
                    key={post.id}
                    post={post}
                    isModalOpen={isModalOpen[post.id]}
                    toggleModal={toggleModal}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-marketplaces">
              You have not added any Marketplaces!
            </p>
          )}

          {/* Add Button */}
          <button onClick={showModal} className="add-btn">
            +
          </button>

          <MarketplaceModal
            onOk={handleOk}
            onCancel={handleCancel}
            isModalOpen={IsOpen}
          />
        </main>
      </div>
    </>
  );
};
