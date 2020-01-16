import { Link } from "gatsby"
import PropTypes from "prop-types"

import styled from "styled-components"

import React from "react"
import Img from "gatsby-image"
import { breakpoints } from "../breakpoints"


const Card = styled.div`
  background: #fff;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 100%;
  img {
    width: 100%;
    height: auto;
  }

  
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;
  width: 100%;
    flex-direction: column;


  @media ${breakpoints.laptop} {
    flex-direction: row;
  }

  h4,
  h5 {
    margin: 0;
    text-align: center;
  }
`

const TeamCard = ({ person }) => (
  <Card>
    <Link
      to={person.fields.slug}
      style={{ textDecoration: `none`, color: "#212121" }}
    >
      <img src={person.frontmatter.featuredImage.childImageSharp.resize.src} />
      <Meta>
        <h4>{person.frontmatter.name}</h4>
        <h5>{person.frontmatter.title}</h5>
      </Meta>
    </Link>
  </Card>
)

TeamCard.propTypes = {
  person: PropTypes.object,
}

TeamCard.defaultProps = {
  person: ``,
}

export default TeamCard
