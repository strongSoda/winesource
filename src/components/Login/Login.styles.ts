import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    div {
        width: 50%;

        header {
            margin-top: 4vh;
            display: flex;
            justify-content: space-around;

            .brand {
                color: #8a1f1a;
                letter-spacing: 4px;
                text-transform: uppercase;
            }

            .login_btn {
                background: black;
                color: #fff;
                padding: 1em 3em;
                text-transform: uppercase;
                cursor: pointer;
                font-weight: 600;
                border: none;
            }
        }

        form {
            display: flex;
            justify-content: baseline;
            padding-top: 5vh;
            flex-direction: column;
            height: 100%;
            align-items: center;

            input {
                width: 40%;
                padding: 1.2em 1em;
                background-color: #eff4fb;
                border: none;
                font-family: 'Poppins', sans-serif;
                
                ::placeholder {
                    /* color: #cec5c5; */
                    font-family: 'Poppins', sans-serif;
                    font-weight: bold;
                    opacity: .5;
                }
            }

            div {
                color: #8a1f1a;
                margin-left: 6em;
                font-size: .8em;
            }

            input[type=submit] {
                background-color: #8a1f1a;
                color: #fff;
                border: none;
                width: fit-content;
                padding: 1em 4em;
                text-transform: uppercase;
                margin-top: 3vh;
                font-weight: 600;
            }
        }
    }


    .banner {
        background: linear-gradient(0deg, rgba(195, 20, 50, 0.7), rgba(36, 11, 54, 0.8)), url('https://images.pexels.com/photos/2308939/pexels-photo-2308939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        h1, p {
        color: #fff;
        position: relative;
        top: 30%;
        width: 60%;
        margin: 0 auto;
        }

        p {
            margin-top: 2.5vh;
        }
    }
`;

export { LoginWrapper };
