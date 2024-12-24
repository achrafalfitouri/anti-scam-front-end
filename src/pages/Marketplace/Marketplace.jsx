import React, { useEffect, useState } from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserProvider";
import "./Marketplace.css";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthProvider";
import { Card, Divider } from "antd";
import MarketplaceModal from "../../components/MarketplaceModal/MarketplaceModal";
import MarketplaceItem from "./MarketplaceItem/MarketplaceItem";
import { Loader } from "../../components/Loader/Loader";
import { usePosts } from "../../contexts/PostsProvider";
import itemImage from "../../assests/images/item.jpg";
import ShowAllPosts from "./MarketplaceShowAll/ShowAllPosts";
import { LeftOutlined } from "@ant-design/icons";

export const Marketplace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { Meta } = Card;
  const { loggedInUserState } = useLoggedInUser();
  const [IsOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const staticPosts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    category: `Category ${Math.ceil((index + 1) / 4)}`,
    images: [itemImage, itemImage],
    description: `Unbeatable offers in Post ${index + 1}.`,
  }));
  // const staticPosts = Array.from({ length: 12 }, (_, index) => {
  //   let category;
  //   if (index < 5) {
  //     category = "Category 1";
  //   } else if (index < 8) {
  //     category = "Category 2";
  //   } else if (index < 10) {
  //     category = "Category 3";
  //   } else {
  //     category = "Category 4";
  //   }

  //   return {
  //     id: index + 1,
  //     category: category,
  //     images: [itemImage, itemImage],
  //     description: `Unbeatable offers in Post ${index + 1}.`,
  //   };
  // });

  const groupedPosts = staticPosts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {});

  useEffect(() => {
    if (staticPosts.length) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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

  const handleShowAllClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const { postLoading } = usePosts();

  return (
    <>
      {auth.isAuth && <Header />}
      <div className="app-container">
        {auth.isAuth && <Navbar />}
        <main className="marketplace-container">
          {postLoading ? (
            <div className="loading-spinner">
              <Loader />
            </div>
          ) : selectedCategory ? (
            <div className="show-all-container">
              <button className="back-btn" onClick={handleBackToCategories}>
                <LeftOutlined />
              </button>
              <h2>{selectedCategory}</h2>
              <ShowAllPosts
                posts={groupedPosts[selectedCategory]}
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
              />
            </div>
          ) : (
            Object.entries(groupedPosts).map(([category, posts]) => (
              <div key={category} className="marketplace-category">
                <div className="category-header">
                  <div className="left-section">
                    <h2>{category}</h2>
                  </div>
                  <div className="right-section">
                    <button
                      className="show-all-btn"
                      onClick={() => handleShowAllClick(category)}
                    >
                      Show All
                    </button>
                  </div>
                </div>
                <Divider
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <div className="post-grid">
                  {posts.slice(0, 4).map((post) => (
                    <div key={post.id} className="post-item">
                      <Card
                        onClick={() => toggleModal(post.id, true)}
                        hoverable
                        style={{
                          width: 240,
                          backgroundColor: "rgb(37, 38, 39)",
                          color: "white",
                        }}
                        cover={
                          <img
                            alt={`Post ${post.id}`}
                            src={post.images[0]}
                            loading="lazy"
                          />
                        }
                      >
                        <Meta
                          title={
                            <span style={{ color: "white" }}>
                              Post Title {post.id}
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
              </div>
            ))
          )}
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
