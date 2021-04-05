import { createGlobalStyle, css } from 'styled-components';

const globalStyle = createGlobalStyle`
${({ theme }) => css`
  #root,
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background: ${theme.backgroundColor};
    font-family: 'Poppins', sans-serif;
  }
  a {
    color: #8a1f1a;
  }
`}
`;

export default globalStyle;
