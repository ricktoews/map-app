import React, { useState } from 'react'; 
import ScoringPanel from './ScoringPanel';
import usStates from './us-map-data.js';
import { flags } from './USFlags';
import { pickRandomFlags } from './flags-helper';
import { initPool, updatePool } from './pool';
import { initKeyHandler } from './key-entry';
import { setTracking } from './api';
import { user_id } from './config';
import './USMap.scss';
  
interface Iprops {
  tracking: any;
  width: number;
}

const USMap: React.FC<Iprops> = (props: Iprops) => {
  const { tracking, width } = props;
  const [ pool, setPool ] = useState<string[]>([]);
  if (pool.length === 0) {
    initPool(pool, tracking);
    initKeyHandler();
  }
  const height: number = width * 5/8;
  const flagWidth: number = width / 6;
  const flagHeight: number = flagWidth * 5/8;
  var selectedCode: string;
  var multipleChoice: any[];

  let stateNdx = Math.floor(Math.random() * pool.length);
  selectedCode = pool[stateNdx];
  multipleChoice = pickRandomFlags(selectedCode);

  const descClass = 0||tracking[selectedCode].desc ? 'show-description' : 'hide-description';

  var enterDescClass, flagsClass;

  if (0&&tracking[selectedCode].desc) {
    enterDescClass = 'show-enter-description';
    flagsClass = 'no-flags';
  } else {
    enterDescClass = 'hide-enter-description';
    flagsClass = 'flags';
  }

  const handleFlagClick = (e: any) => {
    let el = e.currentTarget;
    let flag = el.dataset.flag;
    processClicked(flag);
  }

  const handleBlur = (e: any) => {
    let description = e.currentTarget.value;
    console.log('description', selectedCode, description);
    tracking[selectedCode].desc = description;
    setPool(JSON.parse(JSON.stringify(pool)));
    setTracking(1, tracking).then((resp: any) => {
      console.log('Save description complete', selectedCode, tracking[selectedCode]);
    });
  }

  function processClicked(code: any) {
    console.log('processClicked', code, selectedCode);
    if (code === selectedCode.toLowerCase()) {
      tracking[selectedCode].correct++;
      tracking[selectedCode].presented++;
      let newPool = updatePool(selectedCode, pool);
      setPool(newPool);
    } else {
      tracking[selectedCode].presented++;
    }
    setTracking(1, tracking).then((resp: any) => {
      console.log('Save completed', selectedCode, tracking[selectedCode]);
    });
  }

  const unHighlightState = (e: any) => {
    let target = e.target;
    target.classList.remove('highlight');
    e.stopPropagation();
  }
    
  const highlightState = (e: any) => {
    let target = e.target;
    target.classList.add('highlight');
    e.stopPropagation();
  }   

  return (
      <div>
        <ScoringPanel tracking={tracking} />
        <div className="map" style={{ height }}>
          <svg
             onMouseOver={highlightState}
             onMouseOut={unHighlightState}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 959 593"
             id="us-map">
             {usStates.map(st => {
                let classes = 'path';
                if (st.id === selectedCode) classes += ' selected';
                return <path key={st.id} className={classes} id={st.id} d={st.d} />
             })}
          </svg>
        </div>
        <div className={'item-description ' + descClass}>{tracking[selectedCode].desc}</div>
        <div className={flagsClass}>
          {multipleChoice.map((st: string) => (
            <div key={st} style={{ height: "15%", width: "15%" }}>
            <img data-flag={st} onClick={handleFlagClick} src={flags[st]} />
            </div>
          ))}
        </div>

        <div className={'focused-flag ' + enterDescClass}>
          <img src={flags[selectedCode.toLowerCase()]} />
          <div className="item-description-wrapper">
            <div>Have a look at the flag, and write a detailed description, including anything that will help you associate it with {selectedCode}.</div>
            <textarea onBlur={handleBlur} id="item-description"></textarea>
          </div>
        </div>
      </div>
  );
}

export default USMap;

