import React from 'react';
import USMap from './USMap';

const Map: React.FC = () => {
console.log('Rendering main map component.');
  return (
      <div>
        <USMap width={500} />
      </div>
  );
}

export default Map;

