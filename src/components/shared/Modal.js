import styled from 'styled-components';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';

import Shortcut from './Shortcut';
import IconButton from './IconButton';
import { MODAL_ROOT_SELECTOR } from '../../constants/dom';
import { getSize, getColor, getZIndex } from '../../helpers/theme';

const Modal = ({ title, onClose, children }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (modalRef) {
      modalRef.current.focus();
    }

    if (document.body.classList.contains('with-modal')) {
      return;
    }

    document.body.classList.add('with-modal');

    return () => {
      document.body.classList.remove('with-modal');
    };
  }, [modalRef]);

  const onClickOverlay = event => {
    event.stopPropagation();

    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay data-modal innerRef={overlayRef} onClick={onClickOverlay}>
      <ModalBox innerRef={modalRef} tabIndex={-1}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <IconButton color="subtleFg" onClick={onClose}>
            <Shortcut command="closeModal" action={onClose} />
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </ModalHeader>
        {children}
      </ModalBox>
    </ModalOverlay>,
    document.querySelector(MODAL_ROOT_SELECTOR)
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: ${getSize('xs')};
  left: 0;
  right: 0;
  background-color: ${props => transparentize(0.6, getColor('fg')(props))};
  justify-content: center;
  align-items: center;
  z-index: ${getZIndex('modal')};
`;

const ModalBox = styled.div`
  background-color: ${getColor('bg')};
  border-radius: 0.5rem;
  padding: ${getSize('sm')};
  width: 100%;
  max-width: 540px;
  max-height: calc(100% - ${getSize('md')});
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 ${getSize('md')};
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin: 0 ${getSize('sm')} 0 0;
`;

export default Modal;
