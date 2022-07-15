import { Mixins, Typography } from '@openfin/ui-library';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font: ${Typography.base};
    color: ${({ theme }) => theme.palette.textDefault};
    background-color: ${({ theme }) => theme.palette.background2};
    caret-color: ${({ theme }) => theme.palette.textDefault};
    user-select: none;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  &, * {
    ${Mixins.scrollbar.base}
  }
  path {
    color: ${({ theme }) => theme.palette.textDefault}
  }
`;
