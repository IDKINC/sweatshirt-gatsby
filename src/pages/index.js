import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from 'gatsby-image'


import TeamCard from "../components/team/team__card"
import Grid from "../components/layout/Grid"


const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const IndexPage = ({ data }) => {

  const { edges: members } = data.team;

  return (<Layout>
    <SEO title="Home" />

    <Container>
      <Img fluid={data.mainBanner.childImageSharp.fluid} style={{ width: "100%", height: "100%" }} />
    </Container>
    <Container>
      <h1>Meet The Team</h1>
      <Grid>
        {members.map(({ node: member }) => (<TeamCard person={member} />))}
      </Grid>
    </Container>

  </Layout>)
}

export default IndexPage



export const pageQuery = graphql`
query HomePageQuery {
  mainBanner: file(relativePath: { eq: "sweatshirt-banner.png" }) {
        childImageSharp {
          fluid(maxWidth: 2400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
  team: allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          name
          title
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
            }
          }
        }
        fields{
          slug
        }
      }
    }
  }
}
` 
