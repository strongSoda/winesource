import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const InventoryWrapper = styled.div`
.content {
        margin-top: 10vh !important;
        background-color: ${CSSVARIABLES.primaryBackgroundDark};
    .ag-theme-material {
        margin: 0 auto;
        /* border: 2px solid black; */
    }
    }
`;

export { InventoryWrapper };
