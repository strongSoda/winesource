import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const UploadImageWrapper = styled.div`
        button {
                        margin: 0 auto;
            background-color: ${CSSVARIABLES.secondaryBackground2};
            color: ${CSSVARIABLES.primaryColor2};
            border: none;
            /* width: fit-content; */
            padding: 1em 2em !important;
            text-transform: uppercase;
            margin-top: 4vh;
            font-weight: 600;
            cursor: pointer;
    }
    .fileSelector {
        cursor: pointer;
    }

            @media (max-width: 768px) {
                .fileSelector { 
                    width: 80% !important;
                }
            }
`;

export { UploadImageWrapper };
