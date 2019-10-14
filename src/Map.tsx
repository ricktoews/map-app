import React, { useState } from 'react';
import ScoringPanel from './ScoringPanel';
import { getTracking } from './api';
import MapModule from './us/Map';
//import MapModule from './AntillesMap';

const Map: React.FC = () => {
  const [ tracking_data, setTracking_data ] = useState(null);
  console.log('tracking_data', tracking_data);
  if (!tracking_data) {
    getTracking(1, 'usmap')
      .then((resp: any) => {
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

export default Map;

