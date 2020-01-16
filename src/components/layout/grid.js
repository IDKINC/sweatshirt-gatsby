import React from "react"
import styled from "styled-components"

import {breakpoints} from "../breakpoints"

const StyledGrid = styled.div`
    background: #fff;
    padding: 0.5em;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
    align-items: flex-start;

    @media ${breakpoints.laptop}{
        grid-template-columns: repeat(5, 1fr);

    }
`

const Grid = ({ children }) => (
    <StyledGrid>
        {children}
    </StyledGrid>
)



export default Grid
