import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';
import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img }) => {
  const [showModal, setShowModal] = useState(false);
  const modalToggle = () => setShowModal(!showModal);
  const { webformatURL, largeImageURL, tags } = img;
  return (
    <ImageGalleryItemStyled>
      <img src={webformatURL} alt={tags} loading="lazy" onClick={modalToggle} />
      {showModal && (
        <Modal src={largeImageURL} alt={tags} modalToggle={modalToggle} />
      )}
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
