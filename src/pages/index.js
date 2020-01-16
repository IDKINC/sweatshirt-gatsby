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
  const { edges: members } = data.team
  const { edges: projects } = data.portfolio

  return (
    <Layout>
      <SEO title="Meet Sweatshirt" />

      <Container style={{ padding: 0, minHeight: 0 }}>
        <Img
          fluid={data.mainBanner.childImageSharp.fluid}
          style={{ width: "100%", height: "100%" }}
        />
      </Container>
      <Container>
        <h1>We Are Makers.</h1>
        <Grid col={3} style={{ gridGap: 0, gridRowGap: "2rem" }}>
          {projects.map(({ node: project }) => (
            <ProjectCard project={project} />
          ))}
        </Grid>
      </Container>

      <Container style={{minHeight: '60vh'}}>
        <h1 style={{ color: "#fff", margin: "2em 0" }}>We Are Storytellers.</h1>
        <Grid col={3} style={{ background: "transparent", width: "80%" }}>
          <SkillsCard>
            <h4>Brand Identity</h4>
          </SkillsCard>
          <SkillsCard>
            <h4>Audio + Video</h4>
          </SkillsCard>
          <SkillsCard>
            <h4>Social Strategy</h4>
          </SkillsCard>
        </Grid>
        <Img
          fluid={data.storyTeller.childImageSharp.fluid}
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
        />

      </Container>

      <Container>
        <h1>This Is Who We Are.</h1>
        <Grid>
          {members.map(({ node: member }) => (
            <TeamCard person={member} />
          ))}
        </Grid>
      </Container>
      <Container style={{ background: "#9C27B0", color: "#fff" }}>
        <h1>Let's Make Magic Happen.</h1>

        <Grid col={2} style={{ background: "transparent", width: "80%", alignItems: "center", justifyContent: "center" }}>

          <Form name="contact" method="POST" data-netlify="true">
            <label>Your Name: <input type="text" name="name" /></label>

            <label>Your Email: <input type="email" name="email" /></label>

            <label>Message: <textarea name="message"></textarea></label>

            <button type="submit">Send</button>

          </Form>
            <div>

            <Img
              fluid={data.newMessage.childImageSharp.fluid}
              style={{ width: "75%", height: "auto", margin: "0 auto"}}
            />
          <h4>Drop us a line and we'll get in touch with you right away.</h4>
            </div>

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
        storyTeller: file(relativePath: { eq: "storytellers.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2400) {
          ...GatsbyImageSharpFluid
        }
      }
    }

      newMessage: file(relativePath: { eq: "new_message.png" }) {
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
