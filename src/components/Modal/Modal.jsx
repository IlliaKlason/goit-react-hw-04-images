import { BackdropStyled, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, modalToggle }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget)
      return modalToggle();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    <BackdropStyled onClick={e => handleKeyDown(e)}>
      <ModalStyled>
        <img src={src} alt={alt} loading="lazy" />
      </ModalStyled>
    </BackdropStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
