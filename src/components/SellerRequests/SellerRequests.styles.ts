import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const SellerRequestsWrapper = styled.div`
   .content {
        margin-top: 10vh;
        text-align: center;
    
        .requests {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 2em;
            max-width: 60vw;
            margin: 0 auto;

            .request {
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
                        }
                    }
                }
            }
        }

        .icon__back {
            cursor: pointer;
        }
        input {
        width: 30%;
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

    button {
            margin: 0 auto;
            background-color: ${CSSVARIABLES.secondaryBackground};
            color: ${CSSVARIABLES.primaryColor2};
            border: none;
            /* width: fit-content; */
            padding: 1em 2em !important;
            text-transform: uppercase;
            margin-top: 4vh;
            font-weight: 600;
            cursor: pointer;
    }

            .wines {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 2em;
            max-width: 60vw;
            margin: 0 auto;

            .wine {
                margin-top: 4vh;
                text-align: left;
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
                    /* padding: 1em; */
                    color: ${CSSVARIABLES.secondaryColor};
                    font-weight: 600;
                }
                .avg_price {
                    text-decoration: line-through;
                    color: ${CSSVARIABLES.gray1}
                }
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            .requests {
                max-width: 80%;

                .request {
                    .actions {
                        .inline {
                            Button {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
`;

export { SellerRequestsWrapper };
