import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Props {
    bgColor: string,
    color: string,
}

const ButtonWrapper = styled.button<Props>`
    background-color: ${props => props.bgColor} !important;
    color: ${props => props.color} !important;
    border: none;
    width: fit-content;
    padding: 1.2em 4em;
    text-transform: uppercase;
    margin-top: 3vh;
    font-weight: 600;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 80vw;
        /* margin: 0 auto; */
    }
`;

export { ButtonWrapper };
