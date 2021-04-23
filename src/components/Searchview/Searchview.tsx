import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import CSSVARIABLES from 'global/constants/css/variables';
import ROUTES from 'global/constants/routes';
import React from 'react';
import { useHistory } from 'react-router';

import { SearchviewWrapper } from './Searchview.styles';

declare interface ISearchviewProps {
  rows: any[],
  query: string,
  setSearchView: (value: React.SetStateAction<boolean>) => void
}

const Searchview: React.FC<ISearchviewProps> = (props: ISearchviewProps) => {
  const history = useHistory()
  
  return (
    <SearchviewWrapper data-testid="Searchview">
      <a href={ROUTES.USER_CUSTOM_REQUEST}><Button text="Send custom request" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground}/></a>
      {props.rows?.length ?
        <section className="search_result">
          <h1><FontAwesomeIcon className="icon__back" icon={faArrowLeft} onClick={() => props.setSearchView(false)} /> Search Result: </h1>
          <section className="wines">
            {props.rows.map(row => (
              <div className="wine" key={row.id} onClick={() => history.push(ROUTES.PRODUCT + '/' + row.id)}>
                <img src={row.img_url} alt={row.name} />
                <p>{row.name}</p>
                <div className="prices">
                  <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </section>
        </section>
        
        :
        <section>
            <h1><FontAwesomeIcon className="icon__back" icon={faArrowLeft} onClick={() => props.setSearchView(false)} /> No results found for {props.query}</h1>
            <a href={ROUTES.USER_CUSTOM_REQUEST}>Send a Custom Request</a>
        </section>
      }
    </SearchviewWrapper>
  )
};

export default Searchview;
