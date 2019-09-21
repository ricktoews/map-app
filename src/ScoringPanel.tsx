import React from 'react';

interface IProps {
  tracking: any;
};

function makeScore(presented: number, correct: number) {
  let scoreWidth = 20;
  let pWidth = scoreWidth;
  let cWidth: number = pWidth * correct / presented;
  let output = (
    <div className="score" style={{ display: "inline-block", position: "relative", width: scoreWidth + 'px', height: "10px", background: "#ccc" }}>
      <div className="presented" style={{ position: "absolute", zIndex: 1, top: 0, left: 0, width: pWidth + 'px', height: "10px", background: "red" }}></div>
      <div className="correct" style={{ position: "absolute", zIndex: 10, top: 0, left: 0, width: cWidth + 'px', height: "10px", background: "green" }}></div>
    </div>
  );
  return output;
}

function ScoringPanel(props: IProps) {
  const { tracking } = props;
  
  const items = tracking ? Object.keys(tracking) : [];
  items.sort();
 
  return (
    <div className="scoring-panel">
      <ul style={{fontSize: "12px", listStyleType: "none", margin: 0, paddingLeft: 0, display: "flex", flexWrap: "wrap", width: "1000px"}}>
      {items.map((item: any, key: number) => {
        let presented = tracking[item].presented;
        let correct = tracking[item].correct;
        return <li style={{ width: "125px" }} key={key}>{item} - {makeScore(presented, correct)}</li>
      })}
      </ul>
    </div>
  );
}

export default ScoringPanel;
