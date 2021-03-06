import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
    .brand {
        font-size: 1em !important; 
        letter-spacing: 4px;
        text-transform: uppercase;
        font-weight: 600;
    }

    .burger {
        /* padding: 1em; */
        background-color: #fff;
        padding: 1em !important;
    }
`;

export { NavbarWrapper };
