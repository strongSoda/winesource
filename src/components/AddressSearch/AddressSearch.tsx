import React, { useRef, useState } from 'react';

import { AddressSearchWrapper } from './AddressSearch.styles';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
declare interface IAddressSearchProps {
  setUserAddress: (address: string, lat: number, lng: number, city: string, state: string, country: string)  => void
}

  function getCountry(address_components: any) {
    for (let result in Object.values(address_components)) {
      let obj = address_components[result]
      console.log(obj);
      for (let key in obj) {
        if (key === 'types') {
          if (obj.types.includes('country')) {
            return obj.long_name
          }
        }
      }
    }
  }
  
  function getCity(address_components: any) {
    for (let result in Object.values(address_components)) {
      let obj = address_components[result]
      console.log(obj);
      for (let key in obj) {
        if (key === 'types') {
          if (obj.types.includes('locality')) {
            return obj.long_name
          }
        }
      }
    }
  }
  
    function getState(address_components: any) {
    for (let result in Object.values(address_components)) {
      let obj = address_components[result]
      console.log(obj);
      for (let key in obj) {
        if (key === 'types') {
          if (obj.types.includes('administrative_area_level_1')) {
            return obj.long_name
          }
        }
      }
    }
  }
  

const AddressSearch: React.FC<IAddressSearchProps> = (props: IAddressSearchProps) => {
  const [address, setAddress] = useState<string>('')

  const handleChange = (address:string) => {
    setAddress(address);
    let suggestionBox = document.getElementById('dropdown');
    // @ts-ignore
    suggestionBox.style.display = 'block';
    
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then( async results => {
        const latLng = await getLatLng(results[0])
        console.log(results, latLng);
        const address_components = results[0].address_components
          // console.log(address_components[0]);
        props.setUserAddress(results[0].formatted_address, latLng.lat, latLng.lng, getCity(address_components), getState(address_components), getCountry(address_components))
      })
  };

  return (
    <AddressSearchWrapper data-testid="AddressSearch">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Type Address to search...',
                className: 'location-search-input',
              })}
            />
            
            {suggestions && 
            <div className="autocomplete-dropdown-container" id="dropdown">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    className="suggestion"
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            }
          </div>
        )}
      </PlacesAutocomplete>
    </AddressSearchWrapper>
  )
};

export default AddressSearch;
