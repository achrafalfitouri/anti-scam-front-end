import React from "react";
import { Card } from "antd";
import MarketplaceItem from "../MarketplaceItem/MarketplaceItem";

const ShowAllPosts = ({ posts, toggleModal, isModalOpen }) => {
  const { Meta } = Card;

  return (
    <div className="post-grid show-all">
      {posts.map((post) => (
        <div key={post.id} style={{ marginTop: "30px" }} className="post-item">
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
                <span style={{ color: "white" }}>Post Title {post.id}</span>
              }
              description={
                <span style={{ color: "white" }}>{post.description}</span>
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
  );
};

export default ShowAllPosts;
