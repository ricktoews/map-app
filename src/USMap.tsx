import React from 'react'; 
import usStates from './us-map-data.js';
import { flags } from './USFlags';
import { pickRandomFlags } from './flags-helper';
import './USMap.scss';
  
interface Iprops {
  width: number;
  setid: Function;
  processCorrect: Function;
}

const USMap: React.FC<Iprops> = (props: Iprops) => {
  const { setid, processCorrect, width } = props;
  const height: number = width * 5/8;
  const flagWidth: number = width / 6;
  const flagHeight: number = flagWidth * 5/8;
      
  let stateNdx = Math.floor(Math.random() * usStates.length);
  let stateId = usStates[stateNdx].id;
  const multipleChoice = pickRandomFlags(stateId); 
  setid(stateId); 
        
  const handleFlagClick = (e: any) => {
    let el = e.currentTarget;
    let flag = el.dataset.flag;
    if (flag === stateId.toLowerCase()) {
      processCorrect(stateId);
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
              if (st.id === stateId) classes += ' selected';
              return <path key={st.id} className={classes} id={st.id} d={st.d} />
           })}
        </svg>
        <div className="flags" style={{ width }}>
          {multipleChoice.map((st: string) => (
            <div style={{ height: flagHeight + "px", width: flagWidth + "px" }}>
            <img key={st} data-flag={st} onClick={handleFlagClick} src={flags[st]} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default USMap;

