import React, { useState } from 'react';
import ScoringPanel from './ScoringPanel';
import { getTracking } from './api';
import MapModule from './Map';
//import MapModule from './antilles/Map';

const MapQuiz: React.FC = () => {
  const [ tracking_data, setTracking_data ] = useState(null);
  if (!tracking_data) {
    getTracking(1, 'usmap')
      .then((resp: any) => {
      console.log('tracking data', resp);
        setTracking_data(resp);
      });
  }
  return tracking_data ? (
      <div>
        <ScoringPanel tracking={tracking_data} />
        <MapModule tracking={tracking_data} width={500} />
      </div>
  ) : null;
}

export default MapQuiz;

