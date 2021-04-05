import { createGlobalStyle, css } from 'styled-components';

const globalStyle = createGlobalStyle`
${({ theme }) => css`
  #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${theme.backgroundColor};
  }
  html {
    font-size: '100%';
  }
`}
`;

export default globalStyle;
