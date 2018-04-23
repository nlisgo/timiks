import React from 'react';
import PropTypes from 'prop-types';
import { darken, lighten, getLuminance } from 'polished';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faCalendarAlt, faCube } from '@fortawesome/fontawesome-pro-solid'

import Info, { InfoItem, InfoIcon } from './Info';
import TimeTable from './TimeTable';
import Button from './Button';
import Section from './Section';

const ArchiveItem = ({
  stats,
  collapsed,
  date,
  hideTimeDetails,
  id,
  onClick,
  puzzle,
  removeArchiveItem,
  showTimeDetails,
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
          <TimeTable
            stats={stats}
            hideTimeDetails={hideTimeDetails}
            showTimeDetails={showTimeDetails}
            times={times}
          />
        </Section>
        <Button danger onClick={() => removeArchiveItem(id)}>Remove</Button>
      </ArchiveItemContent>
    }
  </ArchiveItemBox>
);

ArchiveItem.propTypes = {
  stats: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  removeArchiveItem: PropTypes.func.isRequired,
  showTimeDetails: PropTypes.func.isRequired,
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
