import { motion } from 'framer-motion';
import styled from 'styled-components';

const AddressSearchWrapper = styled.div`

    margin: 0 !important;

    div {
        margin: 0 !important;
    }
    
    .location-search-input {
        width: 20vw;
        margin-left: 1.8vw;
    }

    div {
    }
    .autocomplete-dropdown-container {
        margin-left: 2vw !important;
        padding: 1.2em 1em !important;
        /* border: 1px solid gray; */
        max-height: 20vh;
        min-width: 18.5vw;
        /* max-width: 18.5vw; */

        /* background-color: blue; */

        overflow: auto !important;
        font-size: 1.8em !important;
        z-index: 1;
        /* display: none !important; */
        
        .suggestion {
            margin-top: .5vw !important;
            padding: .4em .2em;
            width: 100%;
            color: black;
        }
    }
`;

export { AddressSearchWrapper };
