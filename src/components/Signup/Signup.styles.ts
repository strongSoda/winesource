import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const SignupWrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

        header {
            /* margin-top: 4vh; */
            display: flex;
            justify-content: space-around;
            background-color: ${CSSVARIABLES.primaryBackground};
            z-index: 10;
            position: fixed;
            height: fit-content;
            width: 50%;
            top: 0;
            padding-top: 2vh;

            .brand {
                color: ${CSSVARIABLES.secondaryColor};
                letter-spacing: 4px;
                text-transform: uppercase;
                font-weight: 600;
            }

            .login_btn {
                background: ${CSSVARIABLES.primaryColor};
                color: ${CSSVARIABLES.primaryColor2};
                padding: 1em 3em;
                font-family: ${CSSVARIABLES.primaryFontFamily};
                text-transform: uppercase;
                cursor: pointer;
                font-weight: 600;
                border: none;
            }
        }

    div {
        width: 50%;
        
        form {
            margin-top: 6vh;
            display: flex;
            justify-content: baseline;
            padding-top: 5vh;
            flex-direction: column;
            height: 100%;
            align-items: center;

            input {
                width: 40%;
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

            div {
                color: ${CSSVARIABLES.secondaryColor};
                margin-left: 6em;
                font-size: .8em;
            }

            input[type=submit] {
                background-color: ${CSSVARIABLES.secondaryBackground};
                color: ${CSSVARIABLES.primaryColor2};
                border: none;
                width: fit-content;
                padding: 1em 4em;
                text-transform: uppercase;
                margin-top: 3vh;
                font-weight: 600;
                cursor: pointer;
            }
        }
    }


    .banner {
        background: linear-gradient(0deg, rgba(195, 20, 50, 0.7), rgba(36, 11, 54, 0.8)), url('https://images.pexels.com/photos/2308939/pexels-photo-2308939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        h1, p {
        color: ${CSSVARIABLES.primaryColor2};
        position: relative;
        top: 30%;
        width: 60%;
        margin: 0 auto;
        }

        p {
            margin-top: 2.5vh;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;

        header {
            width: 100%;
        }

        overflow-y: auto;


        .banner {
            order: 1;
            width: 100%;
            height: fit-content;
            padding-top: 2em;
            padding-bottom: 2em;
            margin-top: 10vh;

            h1 {
                text-align: center;
                font-size: 1.2em;
                font-weight: 600;
            }
            p {
                font-size: .9em;
            }
            h1, p {
                width: 80%;
                top: 2%;
            }
        }
        .form__wrapper {
            width: 100%;
            order: 2;
            margin-bottom: 4vh;

            form {
                margin-top: 0vh;
                padding-top: 0vh;

                input {
                    width: 80%;
                }

                & .address-search {
                    width: 80% !important;
                }

                & .address-search {
                    width: 80% !important;
                }

                & div {
                    margin-left: 6vw;
                    align-self: flex-start;
                }
            }
        }
    }
`;

export { SignupWrapper };
