import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
    .content{
        margin-top: 10vh !important;

        h1 {
            text-align: center;
        }

        Button {
            position: fixed;
            right: 2vw;
        }

        .profile {
            /* background-color: blue; */
            width: 40%;
            margin: 0 auto;

            h3 {
                text-align: center;
            }
            
            p {
                background-color: ${CSSVARIABLES.primaryBackgroundDark};
                padding: 1em 2em;
                width: 100%;
                margin: 2vh auto;


                display: flex;
                flex-direction: column;
                gap: .5em;
                
                .key {
                    color: ${CSSVARIABLES.secondaryColor};
                    font-size: .8em;
                }
            }
        }
    }

            @media (max-width: 768px) {
                .content {
                    .profile {
                        width: 60%;
                        margin: 4em;
                        /* background-color: blue; */
                    }

                    Button {
                        bottom: 8vh;
                        right: 9%;
                        z-index: 10;
                    }
                }
            }
`;

export { ProfileWrapper };
