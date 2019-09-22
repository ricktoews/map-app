import React, { useState } from 'react';
import { setTracking } from './api';

var tracking: any;

const stdHeight = '10px';

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
  let maxPresented = Math.max(...presentedVals);
  return maxPresented;
}

/*
  Format item label for display in scoring area.
  Includes a click handler so item can be moved to Ignore section.
*/
function makeItem(item: string, setChangeIgnore: Function) {
  const handleClick = (e: any) => {
    tracking[item].ignore = true;
    setTracking(1, tracking).then((resp: any) => {
      console.log('Save updated tracking completed', item, tracking[item]);
    });
    setChangeIgnore(tracking[item]);
  }

  let output = (
    <div onClick={handleClick} style={{display: "inline-block", width: "30px", height: stdHeight, cursor: "pointer" }}>{item}</div>
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
    <div className="score" style={{ display: "inline-block", position: "relative", width: scoreWidth + 'px', height: stdHeight, opacity: opacity, background: "#ccc" }}>
      <div className="presented" style={{ position: "absolute", zIndex: 1, top: 0, left: 0, width: pWidth + 'px', height: stdHeight, background: "red" }}></div>
      <div className="correct" style={{ position: "absolute", zIndex: 10, top: 0, left: 0, width: cWidth + 'px', height: stdHeight, background: "green" }}></div>
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
      <h3>Greater focus</h3>
      <ul style={{fontSize: "12px", listStyleType: "none", margin: 0, paddingLeft: 0, display: "flex", flexWrap: "wrap", width: "1000px"}}>
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let focusLevel = calculateFocus(presented, correct, maxPresented);
        let show = focusLevel === 10 && !tracking[item].ignore;
        return show ? <li style={{ width: "75px" }} key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
      <h3>Lesser focus</h3>
      <ul style={{fontSize: "12px", listStyleType: "none", margin: 0, paddingLeft: 0, display: "flex", flexWrap: "wrap", width: "1000px"}}>
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let focusLevel = calculateFocus(presented, correct, maxPresented);
        let show = focusLevel === 0 && !tracking[item].ignore;
        return show ? <li style={{ width: "75px" }} key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
      <h3>Ignore</h3>
      <ul style={{fontSize: "12px", listStyleType: "none", margin: 0, paddingLeft: 0, display: "flex", flexWrap: "wrap", width: "1000px"}}>
      {items.map((item: any, key: number) => {
        let showItem = makeItem(item, setChangeIgnore);
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        let show = tracking[item].ignore;
        return show ? <li style={{ width: "75px" }} key={key}>{showItem}{makeScore(presented, correct, maxPresented)}</li> : null;
      })}
      </ul>
    </div>
  );
}

export default ScoringPanel;
