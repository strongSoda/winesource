import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

interface Props {
    shipping: boolean
}
const OrderShippingInfoWrapper = styled.div<Props>`
    .content {
        margin-top: 12vh;
        /* background-color: blue; */
        h1 {
            text-align: center;
        }
        .address{
            /* background-color: blue; */
            box-shadow: -5px 0px 5px 1px ${CSSVARIABLES.primaryBackgroundDark};
            padding: 1em;
            width: 40%;
            margin: 0 auto;
            cursor: pointer;

            .icon__selected{
                cursor: pointer;                
                padding-right: 1em;                
            }
            ${props => props.shipping && `
                .icon__selected{
                    color: #47e349;
                }
            `}

            ${props => !props.shipping && `
                .icon__selected{
                    color: ${CSSVARIABLES.gray1};
                }
            `}
        }

        .add {
            width: 40%;
            margin: 4vh auto;
            box-shadow: -5px 0px 5px 1px ${CSSVARIABLES.primaryBackgroundDark};
            padding: 1em;
            cursor: pointer;

            .icon__selected_invert {
                cursor: pointer;
                padding-right: 1em;                
            }
            ${props => !props.shipping && `
                .icon__selected_invert{
                    color: #47e349;
                }
            `}

            ${props => props.shipping && `
                .icon__selected_invert{
                    color: ${CSSVARIABLES.gray1};
                }
            `}

            input {
                width: 80% !important;
                padding: 1.2em 1em;
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
        }

        .actions {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            Button {
                width: 40%;
            }
        }
    }

    @media (max-width: 768px) {
        .add, .address, .actions {
            width: 80% !important;

            Button {
                margin: 2vh auto;
                width: 80% !important;
            }
        }
    }
`;


export { OrderShippingInfoWrapper };
