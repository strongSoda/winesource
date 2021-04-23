import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    background-color: ${CSSVARIABLES.secondaryBackground};
    padding: .8em 0em;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;

    p {
        /* width: 100%; */
        font-size: .8em;
        word-wrap: break-word;
        color: ${CSSVARIABLES.primaryColor2};
    }
`;

export { FooterWrapper };
