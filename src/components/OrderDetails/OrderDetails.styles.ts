import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const OrderDetailsWrapper = styled.div`
    .content {
        margin-top: 12vh;
        /* background-color: blue; */
        h1 {
            text-align: center;
        }

        .items{
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .item{
                display: flex;
                justify-content: space-evenly;
                div {
                    /* background-color: blue; */
                    /* width: 50%; */
                    img {
                        height: 10vh;
                    }
                 .info {
                        text-transform: capitalize;
                        display: inline-block;
                        padding-left: 2vw;

                        input {
                            width: 15%;
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

                        .icon__minus, .icon__plus{
                            font-size: 1.3em;
                            padding-right: 1em;
                        color: ${CSSVARIABLES.secondaryColor};
                            padding-left: 1em;
                            cursor: pointer;
                        }
                    }
                    .price {
                        color: ${CSSVARIABLES.secondaryColor}
                    }
                }
            }
        }
        .summary {
            /* background-color: blue; */
            width: 50%;
            margin: 0 auto;
            border-top: 1px solid ${CSSVARIABLES.gray1};
            p {
                display: flex;
                justify-content: space-between;

                .total_price {
                    color: ${CSSVARIABLES.secondaryColor};
                    font-weight: bold;
                    font-size: 2em;
                }
            }

            .actions {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                Button {
                    width: 40%;
                }
            }
        }
    }

        @media (max-width: 768px) {
            .content{
                .summary {
                    width: 80%;
                    .actions {
                        justify-content: space-around;
                        Button {
                            width: 80%;
                        }
                    }
            }
        }
}
`;

export { OrderDetailsWrapper };
