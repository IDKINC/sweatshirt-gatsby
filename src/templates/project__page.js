import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"

import { breakpoints } from "../components/breakpoints"


const VideoGrid = styled.div`
  display: grid; 
  grid-template-columns: 1fr;
  align-items: flex-start;

  @media ${breakpoints.laptop} {
    grid-template-columns: 2fr 1fr;
  }
`
const VideoWrapper = styled.div`
position: relative;
    overflow: hidden;
    padding-top: 56.25%;
    position: sticky;
    top: 0;
`
const ProjectContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;

  h1,h2{
    margin: 5px;
    width: 100%;
  }

`
const TeamPage = props => {
  const {
    data: { project },
  } = props

  const videoId = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
};
  return (
    <Layout>
      <SEO title={project.frontmatter.title + " - " + project.fields.type + " " + (project.fields.clients.length ? "for " + project.fields.clients : "")} />
      <VideoGrid>
        <VideoWrapper>
      <iframe style={{    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,}} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" type="text/html" src={"https://www.youtube.com/embed/" + videoId(project.fields.youtubeLink) + "?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"}></iframe>
      </VideoWrapper>
      <ProjectContent>
      <h1>{project.frontmatter.title}</h1>
      <h2>
        {project.fields.type}{" "}
        {project.fields.clients.length ? "for " + project.fields.clients : ""}
      </h2>
      <div dangerouslySetInnerHTML={{__html: project.html}} />
      </ProjectContent>
      </VideoGrid>
    </Layout>
  )
}

export default TeamPage

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        clients
        type
        youtubeLink
        externalLink
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
  }
`
