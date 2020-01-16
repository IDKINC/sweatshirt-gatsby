import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"

import TeamCard from "../components/team/team__card"
import ProjectCard from "../components/project/project__card"
import Grid from "../components/layout/grid"

import { breakpoints } from "../components/breakpoints"


const Container = styled.section`
  width: 100%;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position:relative;
  padding: 5vh 1vh;

  & > h1{
    text-align: center;
  }
`
const SkillsCard = styled.div`
background: #fff;
padding: 1rem;
transition: 100ms;

h4{
  margin: 0;
  text-align: center;
}

&:hover{
  background: #9C27B0;
  color: #fff;
}
`

const Form = styled.form`
margin: 1em auto;
font-size: 1.5rem;
width: 100%;

@media ${breakpoints.laptop} {
  width: 75%;
  }


input{
  width: 100%;
  font-size: 1em;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  padding: 0.25em;
  margin-bottom: 1em;

}

textarea{
  width: 100%;
  font-size: 1em;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  padding: 0.25em;
  min-height: 5ch;
  resize: vertical;
  margin-bottom: 1em;

}


button[type=submit]{
  width: 100%;
  text-align: center;
  font-size: 1em;
  border: 2px solid #fff; 
  color: #fff;
  background: transparent; 
  padding: 0.5em;
}

`

const IndexPage = ({ data }) => {
  const { edges: projects } = data.portfolio

  return (
    <Layout>
      <SEO title="Meet Sweatshirt" />
      <Container>
        <h1>Our Work.</h1>
        <Grid col={3} style={{ gridGap: 0, gridRowGap: "2em" }}>
          {projects.map(({ node: project }) => (
            <ProjectCard project={project} />
          ))}
        </Grid>
      </Container>

    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query PortfolioPageQuery {
    portfolio: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/content/portfolio/**/*.md" } }
      limit: 1000
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                resize(width: 800) {
                  src
                }
              }
            }
          }
          fields {
            slug
            youtubeLink
            externalLink
            clients
            type
          }
        }
      }
    }
  }
`
