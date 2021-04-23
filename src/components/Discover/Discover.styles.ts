import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const DiscoverWrapper = styled.div`
    text-align: center;
    /* background-color: blue; */
    margin-top: 0px;
    /* background-color: blue; */
    .search__container {
        width: 100vw;
        margin-top: 45px;
        position: fixed;
        background-color: ${CSSVARIABLES.primaryBackground};
        /* background-color: blue; */
        /* left: 50%; */
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

    .content {
        padding-top: 10vh;
        padding-bottom: 10vh;

        .category_deals, .daily_deals {
            margin-top: 7vh;
            margin-bottom: 8vh;
        }
        .wines {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 2em;
            max-width: 60%;
            margin: 0 auto;

            .wine {
                margin-top: 4vh;
                text-align: left;
                cursor: pointer;
                
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
            .wine {
                margin: 0 auto;
            }
            input, button {
                margin: 0 auto;
                display: block;
                width: 80% !important;
                margin-top: 2vh;
            }
        }
`;

export { DiscoverWrapper };
