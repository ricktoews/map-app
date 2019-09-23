import React, { useState } from 'react';
import { setTracking } from './api';
import { findOutliers } from './helpers/outliers';
import './ScoringPanel.scss';

var tracking: any;

const stdHeight = '10px';
const SPOTLIGHT = 1;
const ATTEND_OFF = 0;
const IGNORE = -1;

/*
  The threshold hash and calculateFocus function are used to determine which category of focus an item belongs to.
  The arbitrary threshold values: 
    incorrect < 70% of the time AND presented more than 4 times: greater focus.
    ratio of presented / max presented < 50%, item considered "neglected": greater focus.

  These are calculated settings. The user can choose to ignore any item, regardless of its focus setting.
*/
const threshold = {
  notCorrect: .70,
  presented: 4,
  neglected: .5
}

function calculateFocus(p: number, c: number, max: number) {
  // Focus if c/p < ... say, 70% and p > ... say, 6.
  // Focus if p/max < ... say, 50%
  // Focus levels: two, to begin with: 10 - most, 0 - least.
  let result = 0;
  if (c / p < threshold.notCorrect && p > threshold.presented) {
    result = 10;
  } else if (p / max < threshold.neglected) {
    result = 10;
  }
  return result;
}

/*
  getMaxPresented. Go through all items and find the maximum number of times anything has been presented.
  This is used in determining focus level. If one item has been presented far fewer times than some other
  item, it is considered "neglected" and should probably receive greater attention.
*/
function getMaxPresented(tracking: any) {
  let presentedVals = tracking ? Object.values(tracking).map((item: any) => item.presented) : [];
  let { fences, outliers } = findOutliers(presentedVals);
  // Might be better to filter by fences than individual outliers. Consider it.
  presentedVals = presentedVals.filter((v: any) => outliers.outer.indexOf(v) === -1);
  let maxPresented = Math.max(...presentedVals);
  return maxPresented;
}

/*
  Format item label for display in scoring area.
  Includes a click handler so item can be moved to Ignore section.
*/
function makeItem(item: string, setChangeIgnore: Function, attend: number) {

  const handleClick = (e: any) => {
    tracking[item].attend = attend ? 0 : -1;
    // Clone to avoid Object.is of true, so React doesn't bail on updating state and rerendering.
    // See:
    //   https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
    //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description
    let cloned = JSON.parse(JSON.stringify(tracking[item])); // Causes deep clone.
    setTracking(1, tracking).then((resp: any) => {
      console.log('Save updated tracking completed', item, tracking[item]);
    });
    setChangeIgnore(cloned);
  }

  let output = (
    <div className="scoring-item" onClick={handleClick}>{item}</div>
  );
  return output;
}

/*
  makeScore: generate code for the scoring indicator. Uses proportion of correct / presented.
  Coloring scheme is used: green for correct, red for incorrect. 
  Example: if an item has been presented 12 times and answered correctly 8 times, the bar is 2/3 green, 1/3 red.
  There is also an opacity component: The greater the presented / max presented ratio, the more opaque the score bar.
  Items with a faint score bar have been presented fewer times and should probably receive more focus.
*/
function makeScore(presented: number, correct: number, maxPresented: number) {
  let scoreWidth = 20;
  let pWidth = scoreWidth;
  let cWidth: number = pWidth * correct / presented;
  let opacity: number = presented / maxPresented;

  let output = (
    <div className="score" style={{ width: scoreWidth + 'px', opacity: opacity }}>
      <div className="presented" style={{ width: pWidth + 'px' }}></div>
      <div className="correct" style={{ width: cWidth + 'px' }}></div>
    </div>
  );
  return output;
}


interface IProps {
  tracking: any;
};

function ScoringPanel(props: IProps) {
  tracking = props.tracking;
  const [ changeIgnore, setChangeIgnore ] = useState({});
  
  const items = tracking ? Object.keys(tracking) : [];
  items.sort();
  const maxPresented = getMaxPresented(tracking);
 
  return (
    <div className="scoring-panel">
      <h3>Spotlight</h3>
      <ul className="section">
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore, SPOTLIGHT);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let focusLevel = calculateFocus(presented, correct, maxPresented);
        let show = tracking[item].attend === 1;
        return show ? <li key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
      <h3>Greater focus</h3>
      <ul className="section">
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore, ATTEND_OFF);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let focusLevel = calculateFocus(presented, correct, maxPresented);
        let show = focusLevel === 10 && tracking[item].attend !== -1;
        return show ? <li key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
      <h3>Lesser focus</h3>
      <ul className="section">
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore, ATTEND_OFF);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let focusLevel = calculateFocus(presented, correct, maxPresented);
        let show = focusLevel === 0 && tracking[item].attend !== -1;
        return show ? <li key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
      <h3>Ignore</h3>
      <ul className="section">
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore, IGNORE);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let show = tracking[item].attend === -1;
        return show ? <li key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
    </div>
  );
}

export default ScoringPanel;
