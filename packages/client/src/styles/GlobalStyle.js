import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
 * {
    padding: 0;
    margin: 0;
    vertical-align: baseline;
    list-style: none;
    border: 0;
    outline: none;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: rgb(216,224,240);
    background: linear-gradient(90deg, rgba(216,224,240,1) 31%, rgba(157,211,230,1) 50%, rgba(111,222,245,1) 99%);
  }

`
