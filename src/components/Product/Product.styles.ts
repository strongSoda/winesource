import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const ProductWrapper = styled.div`
    /* background-color: blue; */
    .content {
        margin-top: 12vh;

        .product {
            display: flex;
            justify-content: space-around;

            div {
                img {
                    height: 50vh;
                }
            }
            .details {
                width: 50%;
                /* background-color: yellow; */
                h1 {
                    font-size: 2em;
                    text-transform: capitalize;
                    color: ${CSSVARIABLES.secondaryColor}
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

                Button {
                    border: 2px solid ${CSSVARIABLES.secondaryColor};
                    margin-right: 4px;
                }

                .cases_input{
                    width: 5%;
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
            .in_cart{
                background-color: ${CSSVARIABLES.successLight};
                color: ${CSSVARIABLES.successDark};
                padding: 1em 3em;
                width: fit-content;
                cursor: pointer;
            }
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            .product {
                flex-direction: column;

                .details {
                    padding: 1em;
                    .cases_input{
                        width: 20%;
                    }
                                .in_cart{
                                    width: 57vw;
                                    text-align: center;
                                }
                }
            }
        }
    }
`;

export { ProductWrapper };
