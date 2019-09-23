/*
 * Finding outliers. Approach taken from https://m.wikihow.com/Calculate-Outliers
 */


function calcHalfPoint(data) {
  let median, lower, upper;
  if (data.length % 2) {
    let ndx = data.length / 2 - .5; // e.g., for 7 items, 7 / 2 - .5 = 3; so 0, 1, 2, _3_, 4, 5, 6
    median = data[ndx];
    lower = data.slice(0, ndx);
    upper = data.slice(ndx+1)
  } else {
    let ndx = data.length / 2 - 1; // e.g., for 6 items, 6 / 2 - 1 = 2; so 0, 1, _2_, _3_, 4, 5
    median = (data[ndx] + data[ndx+1]) / 2;
    lower = data.slice(0, ndx);
    upper = data.slice(ndx+1)
  }
  return { median, lower, upper };
}


function getMedian(data) {
  let medianData = calcHalfPoint(data);
  return medianData;
}

function getUpperQuartile(data) {
  let uqData = calcHalfPoint(data);
  return uqData.median;
}

function getLowerQuartile(data) {
  let lqData = calcHalfPoint(data);
  return lqData.median;
}

function getInnerFences(data, Q1, Q3) {
  let mult = (Q1 - Q3) * 1.5;
  return [Q3 - mult, Q1 + mult];
}

function getOuterFences(data, Q1, Q3) {
  let mult = (Q1 - Q3) * 3;
  return [Q3 - mult, Q1 + mult];
}


/*
  This is the function that gets called. It accepts an array of numbers and returns an object:
  {
    fences: {
      inner: [lowerBound, upperBound],
      outer: [lowerBound, upperBound]
    },
    outliers: {
      inner: array of numbers from data that are not within the inner fence,
      outer: array of data items not within the outer fence
    }
  }
*/
function findOutliers(data) {
  data.sort((a, b) => a-b);
  let { median, lower, upper } = getMedian(data);
  let Q1 = getUpperQuartile(upper);
  let Q3 = getLowerQuartile(lower);
  let innerFences = getInnerFences(data, Q1, Q3);
  let outerFences = getOuterFences(data, Q1, Q3);
  let innerOutliers = data.filter(d => d < innerFences[0] || d > innerFences[1]);
  let outerOutliers = data.filter(d => d < outerFences[0] || d > outerFences[1]);
  return { fences: { inner: innerFences, outer: outerFences }, outliers: { inner: innerOutliers, outer: outerOutliers} };
}

export { findOutliers };
