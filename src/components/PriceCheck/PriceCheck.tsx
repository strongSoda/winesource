import React, { useState } from 'react';

import { PriceCheckWrapper } from './PriceCheck.styles';

declare interface IPriceCheckProps {}

const PriceCheck: React.FC = (props: IPriceCheckProps) => {
  const [query, setQuery] = useState<string>('')
  
  const check = () => {
  }

  return (
    <PriceCheckWrapper data-testid="PriceCheck">
      
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={check}>Check</button>    
    </PriceCheckWrapper>
  )
};

export default PriceCheck;
