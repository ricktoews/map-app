import React, { useState } from 'react';
import USMap from './USMap';

const Map: React.FC = () => {
  let [ correctFlag, setCorrectFlag ] = useState(0);
  var selectedId: string | number;
  var enteredAbbr: string = '';
  var lastKeyStroke: number = 0;
  var sinceLastKeyStroke: number = 0;

  const withinRange = (code: number) => {
    let result = code >= 65 && code <= 90 ||
                 code >= 97 && code <= 122;
    let letter = result ? String.fromCharCode(code).toUpperCase() : null;
    return letter;
  }

  const handleKeyUp = (e: any) => {
    let now = Date.now();
    sinceLastKeyStroke = now - lastKeyStroke;
    lastKeyStroke = now;

    let letter = withinRange(e.keyCode);
    if (letter) {
      enteredAbbr += letter;
      if (enteredAbbr.length === 2) {
        // Two letters entered: check against selected.
        if (enteredAbbr === selectedId) {
        console.log('State entered:', enteredAbbr, 'should get next');
          setCorrectFlag(lastKeyStroke);
        }
        // ...and reset.
        enteredAbbr = '';
      }
    } else {
      // Not a letter? Reset.
      enteredAbbr = '';
    }
  }


  document.addEventListener('keypress', handleKeyUp);

  function processCorrect(id: number) {
    setCorrectFlag(id);
  }

  function setSelectedId(id: string) {
    selectedId = id;
    console.log('setSelectedId', id);
  }

  return (
      <div style={{ width: "400px", display: "flex", flexDirection: "column" }}>
        <div style={{ backgroundColor: "#cacaca" }}>
        </div>
        <USMap width={400} setid={setSelectedId} processCorrect={processCorrect} />
      </div>
  );
}

export default Map;

