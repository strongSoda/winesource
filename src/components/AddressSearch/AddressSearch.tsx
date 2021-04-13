import React, { useEffect, useRef, useState } from 'react';

import { AddressSearchWrapper } from './AddressSearch.styles';

declare interface IAddressSearchProps {
  setUserAddress: (address: string, lat: number, lng: number, city: string, state: string, country: string)  => void
}

  function getCountry(address_components: any) {
    for (let result in Object.values(address_components)) {
      let obj = address_components[result]
      // console.log(obj);
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
      // console.log(obj);
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
      // console.log(obj);
      for (let key in obj) {
        if (key === 'types') {
          if (obj.types.includes('administrative_area_level_1')) {
            return obj.long_name
          }
        }
      }
    }
  }
  
let autoComplete: any;
    
const loadScript = (url: string, callback: () => void) => {
  let script: any= document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};
  

function handleScriptLoad(updateQuery: any, autoCompleteRef: any, setUserAddress: any) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, setUserAddress)
  );
}

async function handlePlaceSelect(updateQuery: any, setUserAddress: any) {
  const addressObject = autoComplete.getPlace();
  // console.log(addressObject);
  const query = addressObject.formatted_address;
  const latLng = addressObject.geometry.location
  const address_components = addressObject.address_components
  updateQuery(query);
  setUserAddress(addressObject.formatted_address, latLng.lat(), latLng.lng(), getCity(address_components), getState(address_components), getCountry(address_components))
}


const AddressSearch: React.FC<IAddressSearchProps> = (props: IAddressSearchProps) => {
  const [address, setAddress] = useState<string>('')
  const autoCompleteRef = useRef(null);  
  
  useEffect(() => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBrdAUqv6MyTY5weOsIqNJZXgHNpCFJoBs&callback=initialize&libraries=places',
      // `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setAddress, autoCompleteRef, props.setUserAddress)
    );
  }, []);

  return (<>
      <input className="address-search" style={{width: "40%"}} type="text" ref={autoCompleteRef}  placeholder="Type address to search" list="suggestions" value={address} onChange={(e) => setAddress(e.target.value)}/>
  </>
  )
};

export default AddressSearch;
