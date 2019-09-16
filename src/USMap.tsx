import React, { useState } from 'react'; 
import usStates from './us-map-data.js';
import { flags } from './USFlags';
import { pickRandomFlags } from './flags-helper';
import { initPool, updatePool } from './pool';
import { initKeyHandler } from './key-entry';
import './USMap.scss';
  
interface Iprops {
  width: number;
}

const USMap: React.FC<Iprops> = (props: Iprops) => {
  const [ pool, setPool ] = useState([]);
console.log('USMap top, pool length', pool.length);
  if (pool.length === 0) {
    initPool(pool);
    initKeyHandler();
  }
  const { width } = props;
  const height: number = width * 5/8;
  const flagWidth: number = width / 6;
  const flagHeight: number = flagWidth * 5/8;
  var selectedCode: string;
  var multipleChoice: any[];


  let stateNdx = Math.floor(Math.random() * pool.length);
  selectedCode = pool[stateNdx];
  multipleChoice = pickRandomFlags(selectedCode);

  const handleFlagClick = (e: any) => {
    let el = e.currentTarget;
    let flag = el.dataset.flag;
    processClicked(flag);
  }

  function processClicked(code: any) {
    console.log('processClicked', code, selectedCode);
    if (code === selectedCode.toLowerCase()) {
      updatePool(selectedCode, pool);
      let newPool = pool.slice(0);
      setPool(newPool);
    }
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
      <div style={{ width, height, backgroundColor: "#dfdfdf" }}>
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
        <div className="flags" style={{ width }}>
          {multipleChoice.map((st: string) => (
            <div key={st} style={{ height: flagHeight + "px", width: flagWidth + "px" }}>
            <img data-flag={st} onClick={handleFlagClick} src={flags[st]} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default USMap;

