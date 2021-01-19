import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
        line-height: 1.5;
        -webkit-tap-highlight-color: transparent;
        appearance: none;
    }

    a {
        color: black;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    ::selection {
        background: lightgrey;
    }

    h1 {
        font-size: 2.2em;
        margin-bottom: 16px;
    }
    
    h2 {
        font-size: 1.5em;
    }
`;

export default GlobalStyle;
