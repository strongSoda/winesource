import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

interface Props {
    id: string
}
const OrderPaymentInfoWrapper = styled.div<Props>`
    .content {
        margin-top: 12vh;
        /* background-color: blue; */
        h1 {
            text-align: center;
        }

        .error {
            color: red;
            font-size: .7em;
            text-align: center;
        }
        .payment_methods{
            /* background-color: blue; */
            .zero_methods {
                text-align: center;
            }
            

            .wrapper {
                width: 50%;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                
                Button {
                    width: 40%;
                    background-color: blue;
                }
            }

            .method {
            box-shadow: -5px 0px 5px 1px ${CSSVARIABLES.primaryBackgroundDark};
            padding: 1em;
            width: 40%;
            margin: 0 auto;
            cursor: pointer;
            
            .icon__selected {
                color: ${CSSVARIABLES.gray1};
                padding-right: 1em;
            }

            ${props => props.id && `
                #${props.id}{
                    color: #47e349;
                }
            `}

                span {
                    text-align: center;
                    text-transform: capitalize;
                }
            }
        }

        .card_form {
            /* background-color: blue; */
            width: 50%;
            text-align: center;
            margin: 0 auto;

            .addCard {
                    border: none;
    width: fit-content;
    padding: 1.2em 4em;
    text-transform: uppercase;
    margin-top: 3vh;
    font-weight: 600;
    cursor: pointer;
            }
        }

        .actions {
            margin-top: 6vh !important;
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
         .method, .actions {
            width: 80% !important;

            Button {
                margin: 2vh auto;
                width: 80% !important;
            }
        }
    }
`;

export { OrderPaymentInfoWrapper };
