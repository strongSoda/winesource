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

    .actions {
        /* background-color: blue; */
        width: 50%;
        /* display: inline; */
        margin: 0 auto;
        Button {
            width: 30%;
        }
    }

    .daily__deals {
        position: fixed;
        top: 5vh;
        right: 0;
        width: 20vw;
        background-color: ${CSSVARIABLES.primaryBackground};
        height: 100vh;
        padding: 3em;

        .actions {
            Button {
                width: 100%;
            }
        }
    }
    }
`;

export { InventoryWrapper };
