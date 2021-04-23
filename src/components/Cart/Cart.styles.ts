import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const CartWrapper = styled.div`
    /* background-color: blue; */
    .content {
        margin-top: 12vh;
        
        h1, h2 {
            text-align: center;
        }

        h2 {
            color: ${CSSVARIABLES.secondaryColor};
        }

            /* .cart_header {
                width: 80%;
                margin: 0 auto;
                position: absolute;
                display: flex;
                gap:8em;
                left: 25%;
                .unit_price {
                    padding-left: 11vw;
                }
                .cases {

                }
            } */
    
    
            .items {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 2em;
            max-width: 60vw;
            margin: 0 auto;

            .summary {
                position: fixed;
                right: 0;
                background-color: ${CSSVARIABLES.primaryBackground};
                box-shadow: -5px 0px 5px 1px ${CSSVARIABLES.primaryBackgroundDark};
                padding: 1em;
                /* display: flex;
                flex-direction: column; */
            }
            .item {
                margin-top: 4vh;
                text-align: left;
                border: 1px solid ${CSSVARIABLES.gray1};
                padding: 2em;
                img {
                    height: 200px;
                }
                p {
                    text-transform: capitalize;
                }
                .prices {
                    display: flex;
                    gap: 1em;
                } 
                .price {
                    color: ${CSSVARIABLES.secondaryColor};
                    font-weight: 600;
                }
                .avg_price {
                    text-decoration: line-through;
                    color: ${CSSVARIABLES.gray1}
                }

                                .details {
                    font-size: .8em;                
                    .value{
                        color: ${CSSVARIABLES.secondaryColor};
                        font-weight: bold;
                        .icon__minus, .icon__plus{
                            font-size: 1.3em;
                            padding-right: 1em;
                            padding-left: 1em;
                            cursor: pointer;
                        }
                    }
                }
                .actions {
                    Button {
                        width: 100%;
                    }
                    .inline {
                        Button {
                            width: auto;
                            border: 2px solid ${CSSVARIABLES.secondaryColor};
                            /* margin-bottom: 4vh !important; */
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            .items, .item {
                min-width: 80%;
                padding-bottom: 14vh;
                justify-content: space-around;

            .summary {
                bottom: 0vh;
                right: 7%;
            }
            }
        }
    }
`;

export { CartWrapper };
