import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

interface Props {
    sending: boolean
}

const ChatWrapper = styled.div<Props>`
    height: 60vh;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 20vw;
    background: ${CSSVARIABLES.primaryBackground};
    box-shadow: -5px 2px 5px 1px ${CSSVARIABLES.primaryBackgroundDark};
    z-index: 10;
    
    header, .chat__input {
        background-color: ${CSSVARIABLES.primaryBackgroundDark};
        padding: 1em;

        .icon__close {
            position: absolute;
            left: 0;
            cursor: pointer;
        }
    }

    .chat {
        .icon__wine {
            color: ${CSSVARIABLES.primaryBackgroundDark};
            font-size: 4em;
            position: absolute;
            top: 40%; 
        }
        padding: 0 1em;
        height: 65%;
        overflow-y: auto;
    }
    .chat__input {

        ${props => props.sending && `
            .sending {
                background-color: ${CSSVARIABLES.infoLight};
                color: ${CSSVARIABLES.infoDark};
                padding: .4em;
                font-size: .8em;
            }
        `}
        position: absolute;
        bottom: 0;
        width: 100%;

        input {
            width: 70%;
            padding: 1em 1em;
            background-color: ${CSSVARIABLES.primaryBackground} !important;
            border: none;
            font-family: ${CSSVARIABLES.primaryFontFamily};
            ::placeholder {
                /* color: #cec5c5; */
                font-family: ${CSSVARIABLES.primaryFontFamily};
                font-weight: 500;
                opacity: .5;
            }
        }

        .icon__send {
            padding: 0 1em;
            color: ${CSSVARIABLES.secondaryBackground};
            cursor: pointer;
        }
    }

    @media (max-width: 768px) {
        width: 90vw !important;
        right: 5vw;
        box-shadow: 0 0 10px ${CSSVARIABLES.primaryBackgroundDark};

        header {
            .icon__close {
                left: 4vw;
                /* cursor: pointer; */
            }  
        }
    }
`;

interface MsgProps {
    sender: string,
    id: any
}
const MessageWrapper = styled.div<MsgProps>`
    ${props => props.sender === 'BUYER' && `
        .message {
            position: relative;
            top: ${1 * props.id}vh;
            max-width: 8vw;
            background-color: ${CSSVARIABLES.infoLight};
            color: ${CSSVARIABLES.infoDark};
        }
    `}
    ${props => props.sender === 'SELLER' && `
        .message {
            position: relative;
            top: ${1 * props.id}vh;
            max-width: 8vw;
            background-color: ${CSSVARIABLES.successLight};
            color: ${CSSVARIABLES.successDark};
        }
    `}
    .message {
        text-align: left;
        padding: 0 .7em;
        border-radius: 1em;
        
        min-width: 4vw; 
        p {
            font-size: .9em;
            padding: 0 .1em;
            padding-top: 2vh;
            padding-bottom: 1vh;
            max-width: 5vw;
            word-wrap: break-word;
        }
        span {
            position: absolute;
            top: 6px;
            right: 6px;
            font-size: .65em;
            color: ${CSSVARIABLES.gray1}
        }
    }

    @media (max-width: 768px) {
        .message {
            min-width: 45vw;
            right: 5vw;

            p {
                max-width: 100%;
            }   
        }
    }
`

export { ChatWrapper, MessageWrapper };
