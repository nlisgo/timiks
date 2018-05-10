import React from 'react';
import PropTypes from 'prop-types';

import Selector from '../shared/Selector';
import Button from '../shared/Button';
import puzzles from '../../constants/puzzles';

const TimerOptions = ({ changePuzzle, puzzle, refreshScramble }) => (
  <div>
    <Selector
      label="Puzzle"
      onChange={changePuzzle}
      options={puzzles.map(({ name }) => ({ label: name, value: name }))}
      value={puzzle}
    />
    &nbsp;
    &nbsp;
    <Button tiny tag onClick={refreshScramble}>New scramble</Button>
  </div>
);

TimerOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  refreshScramble: PropTypes.func.isRequired
};

export default TimerOptions;
