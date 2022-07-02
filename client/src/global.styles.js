import { createGlobalStyle } from 'styled-components';  

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Open Sans', sans-serif;
        padding: 20px 60px;

        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }

    a {
        text-decoration: none;
        color: black;
        text-transform: uppercase;
    }

    * {
        box-sizing: border-box;
    }
`;
   