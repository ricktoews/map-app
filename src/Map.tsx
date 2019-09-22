import React, { useState } from 'react';
import { getTracking } from './api';
import USMap from './USMap';

const Map: React.FC = () => {
  const [ tracking_data, setTracking_data ] = useState(null);
  console.log('tracking_data', tracking_data);
  if (!tracking_data) {
    getTracking(1)
      .then((resp: any) => {
        setTracking_data(resp);
      });
  }
  return tracking_data ? (
      <div>
        <USMap tracking={tracking_data} width={500} />
      </div>
  ) : null;
}

export default Map;

