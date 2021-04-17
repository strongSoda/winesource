import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const PriceCheckWrapper = styled.div`
    height: 100vh;
    background-image: url('https://images.pexels.com/photos/2308939/pexels-photo-2308939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    font-family: ${CSSVARIABLES.primaryFontFamily};

    section {
        width: 50%;
        height: fit-content;
        padding: 4em 2em;
        background-color: ${CSSVARIABLES.primaryBackground};
        text-align: center;

        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        
        form {
            .icon__back {
                cursor: pointer;
            }
            h2 {
                color: ${CSSVARIABLES.secondaryColor};
                text-transform: capitalize;
            }
        }
        button {
            background-color: ${CSSVARIABLES.secondaryBackground};
            color: ${CSSVARIABLES.primaryColor2};
            border: none;
            width: fit-content;
            padding: 1.2em 4em;
            text-transform: uppercase;
            margin-top: 3vh;
            font-weight: 600;
            cursor: pointer;
        }

        .form__wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            /* align-content: space-between; */
            
            .errors {
                font-size: .7em;
                color: ${CSSVARIABLES.secondaryColor};                
            }

            input[type=submit] {
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
            input {
                width: 80%;
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
            .form_group {
                text-align: left;
                p {
                    font-size: .9em;
                    margin: 0;
                    margin-top: 4vh;
                    color: ${CSSVARIABLES.secondaryColor};
                    font-weight: 600;
                    /* background-color: blue; */
                }
            }
        }
        
        input {
                            width: 40%;
                padding: 1.2em 2em;
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

        @media (max-width: 768px) {
         section {
             width: 80%;
             margin-top: 4vh;

             input {
                 width: 60%;
             }
         }   
        }
`;

export { PriceCheckWrapper };
