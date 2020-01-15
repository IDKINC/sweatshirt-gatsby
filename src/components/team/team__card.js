import { Link } from "gatsby"
import PropTypes from "prop-types"

import styled from "styled-components"

import React from "react"
import Img from 'gatsby-image'

const Card = styled.div`
    background: #fff;
    padding: 0.5em;
`

const TeamCard = ({ person }) => (
    <Card>
                <Link
                    to={person.fields.slug}
                style={{ textDecoration: `none`, color: "#212121"}}
                >
        <Img fluid={person.frontmatter.featuredImage.childImageSharp.fluid} />
            <h1 style={{ margin: 0 }}>
                    {person.frontmatter.name}
            </h1>
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
