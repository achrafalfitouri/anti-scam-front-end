import React from "react";
import { Carousel, ConfigProvider, Modal } from "antd";
import { createStyles, useTheme } from "antd-style";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    padding: token.paddingSM,
    display: "flex",
    gap: token.paddingMD,
    height: "100%",
  },
  "image-section": {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  "slider-container": {
    width: "100%",
    overflow: "hidden",
  },
  "slick-slide": {
    display: "flex !important",
    justifyContent: "center",
  },
  "slider-image": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    maxHeight: "500px",
  },
  "description-section": {
    flex: 1,
    padding: token.paddingMD,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadow,
    overflowY: "auto",
  },
}));

const MarketplaceItem = ({ post, isModalOpen, toggleModal }) => {
  const { styles } = useStyle();
  const token = useTheme();

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div>
  <Modal
  width={1200}
  title={`Post ${post.id}`}
  open={isModalOpen}
  onOk={() => toggleModal(post.id, false)}
  onCancel={() => toggleModal(post.id, false)}
  footer={null}
  styles={{
    body: { padding: 0 },
    mask: modalStyles.mask,
  }}
  style={{ borderRadius: token.borderRadius }}
>

        <div className={styles["my-modal-body"]}>
          {/* Left Section: Image or Carousel */}
          <div className={styles["image-section"]}>
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    arrowSize: 45,
                    arrowOffset: 30,
                    colorBgContainer: "rgba(74, 72, 72, 0.88)",
                  },
                  token: {},
                },
              }}
            >
              <Carousel arrows dotPosition="bottom" infinite={false}>
                {post.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Post ${post.id} - Slide ${index + 1}`}
                      className={styles["slider-image"]}
                    />
                  </div>
                ))}
              </Carousel>
            </ConfigProvider>
          </div>

          {/* Right Section: Description */}
          <div className={styles["description-section"]}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarketplaceItem;
