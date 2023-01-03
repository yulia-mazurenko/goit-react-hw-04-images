import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openmodal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryItem onClick={openmodal}>
        <GalleryImage
          src={image.webformatURL}
          alt={image.ImageGalleryItemtags}
        />
      </GalleryItem>
      {isModalOpen && <Modal image={image} onCloseModal={closeModal} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
