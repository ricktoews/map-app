var enteredAbbr: string = '';
var selectedCode: string = '';

const withinRange = (code: number) => {
    let result = code >= 65 && code <= 90 ||
                 code >= 97 && code <= 122;
    let letter = result ? String.fromCharCode(code).toUpperCase() : null;
    return letter;
  }


const handleKeyUp = (e: any) => {
    let now = Date.now();

    let letter = withinRange(e.keyCode);
    if (letter) {
      enteredAbbr += letter;
      if (enteredAbbr.length === 2) {
        // Two letters entered: check against selected.
        if (enteredAbbr === selectedCode) {
        console.log('State entered:', enteredAbbr, 'should get next');
        }
        // ...and reset.
        enteredAbbr = '';
      }
    } else {
      // Not a letter? Reset.
      enteredAbbr = '';
    }
  }

const initKeyHandler = () => {
    document.addEventListener('keypress', handleKeyUp);
}

export { initKeyHandler }
