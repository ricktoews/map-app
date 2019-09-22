import React, { useState } from 'react'; 
//import antilles from './antilles-map-data.js';
import antilles from './formatted.js';
import './map.scss';
  
interface Iprops {
  tracking: any;
  width: number;
}

const AntillesMap: React.FC<Iprops> = (props: Iprops) => {
  const { tracking, width } = props;
  const height: number = width * 5/8;


  const unHighlightState = (e: any) => {
    let target = e.target;
    target.classList.remove('highlight');
    e.stopPropagation();
  }
    
  const highlightState = (e: any) => {
    let target = e.target;
    console.log('highlightState', target);
    target.classList.add('highlight');
    e.stopPropagation();
  }   
  const removeSpaces = new RegExp(/\s+/g);
  return (
      <div>
        <div style={{ overflow: "hidden", width, height, backgroundColor: "#dfdfdf" }}>
          <svg
             onMouseOver={highlightState}
             onMouseOut={unHighlightState}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 50 900 600"
             id="us-map">
             {antilles.map((svgitem: any, key: number) => {
                let classes = 'path';
                if (svgitem.path) {
                  let item = svgitem.path;
                  let fill = item.fill || '#ccc';
                  if (item.d) {
                    let path = item.d.replace(removeSpaces, '');
                    return <path key={key} className={classes} fill={fill} id={item.id} d={path} />
                  }
                } else if (svgitem.group) {
                  let item = svgitem.group;
                  let fill = item.fill || '#ccc';
                  let paths = item.paths || [];
                  let dAttrs = paths.map((p:any) => p.d).join('');
                  let path = dAttrs.replace(removeSpaces, '');
                  return <path key={key} className={classes} fill={fill} id={item.id} d={path} />
                } else {
                  return null;
                }
             })}
          </svg>
        </div>
      </div>
  );
}

export default AntillesMap;

