import React, { useState } from 'react';
//import usStates from './us-map-data.js';
//import { flags } from './USFlags';
import { pickRandomFlags } from './flags-helper';
import { setRemedial } from './api-helper';
import { initPool, updatePool } from './pool';
import { initKeyHandler } from '../key-entry';
import { setTracking } from './api';
import { user_id } from '../config';
import './Map.scss';

interface Iprops {
  tracking: any;
  width: number;
}

const Map: React.FC<Iprops> = (props: Iprops) => {
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

  let itemNdx = Math.floor(Math.random() * pool.length);
  selectedCode = pool[itemNdx];
  multipleChoice = pickRandomFlags(selectedCode, tracking);

  /*
    If the remedial flag is set:
      If a description has been entered already,
        Use the show-description class.
        Use the hide-enter-description class.
        Use the flags class.
      Else,
        Use the hide-description class.
        Use the show-enter-description class.
        Use the no-flags class.
    Else,
      Use the hide-description class.
      Use the hide-enter-description class.
      Use the flags class.

  */
  var curTrack = tracking[selectedCode];
  console.log('curTrack', curTrack);
  var showDescClass, enterDescClass, flagsClass;
  if (curTrack.remedial) {
    if (curTrack.desc > '') {
      showDescClass = 'show-description';
      enterDescClass = 'hide-enter-description';
      flagsClass = 'flags';
    } else {
      showDescClass = 'hide-description';
      enterDescClass = 'show-enter-description';
      flagsClass = 'no-flags';
    }
  } else {
    showDescClass = 'hide-description';
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
    if (code === selectedCode) {
      tracking[selectedCode].correct.push(1);
      tracking[selectedCode].presented.push(1);
      while (tracking[selectedCode].presented.length > 10) {
        tracking[selectedCode].presented.shift();
        tracking[selectedCode].correct.shift();
      }
      setRemedial(tracking);
      let newPool = updatePool(selectedCode, pool);
      setPool(newPool);
    } else {
      tracking[selectedCode].correct.push(0);
      tracking[selectedCode].presented.push(1);
      while (tracking[selectedCode].presented.length > 10) {
        tracking[selectedCode].presented.shift();
        tracking[selectedCode].correct.shift();
      }
    }
    setTracking(1, tracking).then((resp: any) => {
      console.log('Save completed', selectedCode, tracking[selectedCode]);
    });
  }

  var mapPieces = Object.values(tracking).map((item: any) => item.svg);
  return (
      <div className="layout">

        <div className="map" style={{ height }}>
          <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 959 593"
             id="us-map">
             {mapPieces.map(st => {
                let classes = 'path';
                if (st.id === selectedCode) classes += ' selected';
                return <path key={st.id} className={classes} id={st.id} d={st.d} />
             })}
          </svg>
        </div>

{/*        <MultChoice handleClick={handleClick} items={multipleChoic} selected={st} /> */}
        <div className="interactive">
          <div className={'item-description ' + showDescClass}>{tracking[selectedCode].desc}</div>
          <div className={flagsClass}>
            {multipleChoice.map((st: string) => (
              <img key={st} style={{ width: '15%', height: '15%' }} data-flag={st} onClick={handleFlagClick} src={tracking[st].img} />
            ))}
          </div>

{/*        <RemedialSetup /> */}
          <div className={enterDescClass}>
            <div className="focused-flag">
              <img src={tracking[selectedCode].img} />
              <div className="item-description-wrapper">
                <div>Have a look at the flag, and write a detailed description, including anything that will help you associate it with {selectedCode}.</div>
                <textarea onBlur={handleBlur} id="item-description"></textarea>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
}

export default Map;
