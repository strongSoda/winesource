import { motion } from 'framer-motion';
import styled from 'styled-components';

const SearchviewWrapper = styled.div`
    padding-top: 5vh;

    h1{
        font-size: 1.8em;
    }
    .icon__back {
        cursor: pointer;
    }
    Button {
        position: fixed;
        right: 6vw;
        top: 15%;
    }

    padding-bottom: 12vh;

    @media (max-width: 768px) {
        padding-top: 10vh;

        Button {
            position: fixed;
            top: auto;
            bottom: 0vh;
            right: 10%;
        }

        h1 {
            font-size: 1em;
        }
    }
`;

export { SearchviewWrapper };
