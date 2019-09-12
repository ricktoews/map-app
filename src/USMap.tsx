import React from 'react'; 
import usStates from './us-map-data.js';
import { flags } from './USFlags';
import './USMap.scss';
  
interface Iprops {
  width: number;
  setid: Function;
  processCorrect: Function;
}

function pickRandomFlags(correct: string): string[] {
  // Choose five random states.
  let _ndx: number[] = Array.from(Array(50).keys());
  let ids: string[] = [];
  for (let i = 0; i < 5; i++) {
    let ndxNdx = Math.floor(Math.random() * _ndx.length);
    let stateIndex = _ndx[ndxNdx];
    ids.push(usStates[stateIndex].id.toLowerCase());
    _ndx.splice(ndxNdx, 1);
  } 
  if (ids.indexOf(correct.toLowerCase()) === -1) {
    let correctNdx = Math.floor(Math.random() * 5);
    ids[correctNdx] = correct.toLowerCase();
  } 
  return ids;
}   

const USMap: React.FC<Iprops> = (props: Iprops) => {
  const { setid, processCorrect, width } = props;
  const height: number = width * 5/8;
      
  let stateNdx = Math.floor(Math.random() * usStates.length);
  let stateId = usStates[stateNdx].id;
  const multipleChoice = pickRandomFlags(stateId); 
        console.log('USMap new stateId', stateId);
        console.log('multiple choice', multipleChoice);
  setid(stateId); 
        
  const handleFlagClick = (e: any) => {
    let el = e.currentTarget;
    let flag = el.dataset.flag;
    console.log('clicked flag for', flag);
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
      <div className="flags" style={{display:"flex", flexWrap: "wrap", width }}>
        {multipleChoice.map((st: string) => {
          return <img key={st} data-flag={st} onClick={handleFlagClick} src={flags[st]} style={{flex: 1, width: "20%", height: "20%" }}/>
        })}
      </div>
    </div>
  );
}

export default USMap;

