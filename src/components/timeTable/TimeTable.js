import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import { AVAILABLE_STATS } from '../../constants/app';
import * as CustomPropTypes from '../../propTypes';
import TimeGraph from './TimeGraph';
import ToggleContent from '../ToggleContent';
import IconButton from '../shared/IconButton';
import Section from '../shared/Section';
import Tag from '../shared/Tag';
import Modal from '../shared/Modal';
import TimeTableTimeRow from './TimeTableTimeRow';
import { Cell, Tables } from '../shared/Tables';
import TimeTableStatRow from './TimeTableStatRow';

const TimeTable = ({ stats, removeTime, times }) => {
  const noDnfTimes = times.filter(time => !time.dnf);
  const showGraph = noDnfTimes.length > 1;

  return (
    <TimeTableContainer>
      <TimeTableColumn>
        <Tables>
          <thead>
            <tr>
              <HeadingCell>Stats</HeadingCell>
              <SubtleHeadingCell>Current</SubtleHeadingCell>
              <SubtleHeadingCell>Best</SubtleHeadingCell>
              <HeadingCell rightAlign>
                <ToggleContent
                  toggle={({ show }) => (
                    <QuestionIconButton onClick={show}>
                      <FontAwesome icon={faQuestionCircle} size="sm" />
                    </QuestionIconButton>
                  )}
                  content={({ hide }) => (
                    <Modal title="Stats" onClose={hide}>
                      <Section margin="sm">
                        <p>
                          After 2 valid solves (excluding DNF{`'`}s) a trend graph will be shown.
                        </p>

                        <p>
                          When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>
                          ) will be shown (best average of 3 consecutive solves).
                        </p>

                        <p>
                          After 5 solves the average of the <i>last</i> 5 solves (without the best
                          and the worst solve) will be shown (<strong>ao5</strong>). After that it
                          will continue with: <strong>ao12, ao25, ao50* and ao100*</strong>.
                        </p>

                        <i>
                          *The a50 will exclude the best and worst 3 solves, the ao100 will exclude
                          5.
                        </i>
                      </Section>
                    </Modal>
                  )}
                />
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {AVAILABLE_STATS.filter(stat => stats[stat.name]).length === 0 && !showGraph && (
              <tr>
                <Cell colSpan="2">
                  <i>Not enough solves yet.</i>
                </Cell>
              </tr>
            )}
            {AVAILABLE_STATS.filter(stat => stats[stat.name]).map(stat => {
              const { current, best } = stats[stat.name];
              return (
                <TimeTableStatRow key={stat.name} name={stat.name} current={current} best={best} />
              );
            })}
          </tbody>
        </Tables>
        {showGraph && (
          <Section margin="xs">
            <GraphContainer>
              <TimeGraph times={noDnfTimes} forSession />
            </GraphContainer>
          </Section>
        )}
      </TimeTableColumn>
      <TimeTableColumn>
        <Tables>
          <thead>
            <tr>
              <HeadingCell colSpan="3">
                Times <Tag>{times.length}</Tag>
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <TimeTableTimeRow key={time.id} time={time} index={index} removeTime={removeTime} />
            ))}
          </tbody>
        </Tables>
      </TimeTableColumn>
    </TimeTableContainer>
  );
};

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
  removeTime: PropTypes.func,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
};

const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 512px) {
    flex-direction: row;
  }
`;

const TimeTableColumn = styled.div`
  margin-bottom: ${props => props.theme.sizes.sm};
  overflow: auto;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 512px) {
    width: 50%;
    margin-right: ${props => props.theme.sizes.md};
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }
  }
}
`;

const GraphContainer = styled.div`
  padding-top: ${props => props.theme.sizes.sm};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const HeadingCell = styled.th`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-bottom: 2px solid ${props => props.theme.colors.grey};
  height: 3.6rem;
  font-weight: bold;
`;

const SubtleHeadingCell = HeadingCell.extend`
  font-weight: normal;
`;

const QuestionIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
  margin-left: ${props => props.theme.sizes.xs};
`;

export default React.memo(TimeTable);
