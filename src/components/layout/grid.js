import { Link } from "gatsby"
import PropTypes from "prop-types"

import styled from "styled-components"

import React from "react"
import Img from 'gatsby-image'

const StyledGrid = styled.div`
    background: #fff;
    padding: 0.5em;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    grid-gap: 1em;
`

const Grid = ({ children }) => (
    <StyledGrid>
        {children}
    </StyledGrid>
)



export default Grid
