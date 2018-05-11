import React from 'react';
import PropTypes from 'prop-types';
import { darken, lighten, getLuminance } from 'polished';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faCalendarAlt, faCube } from '@fortawesome/fontawesome-pro-solid'

import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import Info, { InfoItem, InfoIcon } from '../shared/Info';
import TimeTableContainer from '../../containers/TimeTableContainer';
import Button from '../shared/Button';
import Section from '../shared/Section';
import ModalContainer from '../../containers/ModalContainer';

const ArchiveItem = ({
  collapsed,
  date,
  id,
  onClick,
  puzzle,
  removeArchiveItem,
  times,
  title
}) => (
  <ArchiveItemBox>
    <ArchiveItemHeader onClick={onClick}>
      <div>
        <ArchiveItemTitle>{title}</ArchiveItemTitle>
        <Info>
          <InfoItem>
            <InfoIcon><FontAwesome icon={faCube}/></InfoIcon> {puzzle}
          </InfoItem>
          <InfoItem>
            <InfoIcon><FontAwesome icon={faCalendarAlt}/></InfoIcon> {date.toLocaleDateString()}
          </InfoItem>
        </Info>
      </div>
      <CollapseIcon>
        <FontAwesome icon={collapsed ? faCaretRight : faCaretDown}/>
      </CollapseIcon>
    </ArchiveItemHeader>
    {
      !collapsed &&
      <ArchiveItemContent>
        <Section margin="sm">
          <TimeTableContainer
            times={times}
            editable={false}
          />
        </Section>
        <ModalContainer
          title={`Remove ${title}`}
          id={`removeArchiveItem.${id}`}
          toggle={openModal => <Button danger onClick={openModal}>Remove</Button>}
          content={closeModal => (
            <div>
              <Section margin="md">
                <p>Are you sure you want to remove {title}?</p>
              </Section>
              <ButtonDuo>
                <ButtonDuoItem>
                  <Button danger onClick={() => closeModal() && removeArchiveItem(id)}>Remove</Button>
                </ButtonDuoItem>
                <ButtonDuoItem>
                  <Button fg empty onClick={closeModal}>Cancel</Button>
                </ButtonDuoItem>
              </ButtonDuo>
            </div>
          )}
        />
      </ArchiveItemContent>
    }
  </ArchiveItemBox>
);

ArchiveItem.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  removeArchiveItem: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
};

const ArchiveItemBox = styled.div`
  font-size: 1.6rem;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding: ${props => props.theme.sizes.sm};

  &:hover {
    cursor: pointer;
    border: 1px solid ${props => {
      const color = props.theme.colors.grey;

      return getLuminance(color) > 0.5 ? darken(0.1, color) : lighten(0.1, color);
    }};
  }
`;

const ArchiveItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.sizes.sm};
  margin: -${props => props.theme.sizes.sm};
`;

const ArchiveItemTitle = styled.strong`
  display: block;
  margin-bottom: ${props => props.theme.sizes.xxs};
`;

const ArchiveItemContent = styled.div`
  margin-top: ${props => props.theme.sizes.sm};
`;

const CollapseIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.subtleFg};
  width: 0.8em;
`;

export default ArchiveItem;
