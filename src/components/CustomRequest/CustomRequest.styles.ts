import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

interface Props {
    success: boolean
}

const CustomRequestWrapper = styled.div<Props>`
    .content {
        padding-top: 10vh;
        text-align: center;
        
        ${props => props.success && `
            .success {
                background-color: ${CSSVARIABLES.successLight};
                color: ${CSSVARIABLES.successDark};
                padding: 1em;
            }
        `}
        input {
            margin: 0 auto;
            margin-top: 4vh;
            width: 20%;
            display: block;
            padding: 1em 1em;
            background-color: ${CSSVARIABLES.primaryBackgroundDark};
            border: none;
            font-family: ${CSSVARIABLES.primaryFontFamily};
            ::placeholder {
                /* color: #cec5c5; */
                font-family: ${CSSVARIABLES.primaryFontFamily};
                font-weight: 500;
                opacity: .5;
            }
        }

        Button {
            margin: 0 auto;
            margin-top: 4vh;
            display: block;
        }

        select {
            background-color: ${CSSVARIABLES.primaryBackgroundDark};
            border: none;
            padding: 1em;
            width: 20%;
            text-transform: capitalize;
        }
        .seller {
                /* background-color: blue !important; */
        }

    }

                @media (max-width: 768px) {
                    .content {
                        select, input {
                            width: 80%;
                        }
                    }
                }
`;

export { CustomRequestWrapper };
