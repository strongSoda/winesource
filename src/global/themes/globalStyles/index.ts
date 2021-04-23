import CSSVARIABLES from 'global/constants/css/variables';
import { createGlobalStyle, css } from 'styled-components';

const globalStyle = createGlobalStyle`
${({ theme }) => css`
  #root,
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    /* height: 100vh; */
    background: ${theme.backgroundColor};
    font-family: ${CSSVARIABLES.primaryFontFamily}
  }
  a {
    color: ${CSSVARIABLES.secondaryColor};
  }
`}
`;

export default globalStyle;
