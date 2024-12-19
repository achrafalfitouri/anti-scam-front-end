import {  Modal } from 'antd';
import MarketplaceForm from '../MarketplaceForm/MarketplaceForm';

const MarketplaceModal = ({  onOk, onCancel, isModalOpen }) => {
    
  return (
    <>

      <Modal width={800} title="Basic Modal" open={isModalOpen} onOk={onOk} onCancel={onCancel}>
       <MarketplaceForm/>
      </Modal>
    </>
  );
};
export default MarketplaceModal;