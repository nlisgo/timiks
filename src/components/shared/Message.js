import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';
import IconButton from './IconButton';
import { getSize, getColor } from '../../helpers/theme';

const Message = ({ message, dismiss, withPointer }) => (
  <MessageBox>
    <div className="container">
      <MessageContent>
        {withPointer && <MessagePointer />}
        <MessageText>{message}</MessageText>
        <MessageClose>
          <IconButton onClick={dismiss}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </MessageClose>
      </MessageContent>
    </div>
  </MessageBox>
);

Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dismiss: PropTypes.func.isRequired,
  withPointer: PropTypes.bool
};

const MessageBox = styled.div`
  color: ${getColor('white')};
  background-color: ${getColor('blue')};
  padding: 2rem 0;
`;

const MessageContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
`;

const MessagePointer = styled.div`
  content: '';
  width: 0;
  height: 0;
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
  border-top: 0.9rem solid ${getColor('blue')};
  position: absolute;
  bottom: calc(-2.9rem);
  right: 0.1rem;
`;

const MessageText = styled.div`
  flex-grow: 1;
`;

const MessageClose = styled.div`
  margin-left: ${getSize('md')};
  margin-right: ${getSize('xxs')};
  display: flex;
  align-items: center;
`;

export default Message;
