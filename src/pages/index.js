import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"

import TeamCard from "../components/team/team__card"
import ProjectCard from "../components/project/project__card"
import Grid from "../components/layout/grid"

const Container = styled.section`
  width: 100%;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const IndexPage = ({ data }) => {
  const { edges: members } = data.team
  const { edges: projects } = data.portfolio

  return (
    <Layout>
      <SEO title="Home" />

      <Container>
        <Img
          fluid={data.mainBanner.childImageSharp.fluid}
          style={{ width: "100%", height: "100%" }}
        />
      </Container>
      <Container>
        <h1>We Are Makers.</h1>
        <Grid col={3}>
          {projects.map(({ node: project }) => (
            <ProjectCard project={project} />
          ))}
        </Grid>
      </Container>

      <Container>
        <h1>We Are Storytellers.</h1>
      </Container>

      <Container>
        <h1>This Is Who We Are.</h1>
        <Grid>
          {members.map(({ node: member }) => (
            <TeamCard person={member} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
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
    team: allMarkdownRemark(
      sort: { fields: fields___weight, order: DESC }
      filter: { fileAbsolutePath: { glob: "**/src/content/team/*.md" } }
      limit: 1000
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            title
            featuredImage {
              childImageSharp {
                resize(width: 500) {
                  src
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    portfolio: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/content/portfolio/**/*.md" } }
      limit: 6
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
