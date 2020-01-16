import React from "react"

import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"

import styled from "styled-components"




const TeamPage = props => {
  const {
    data: { post },
  } = props
  return (
    <Layout>
      <SEO title={post.frontmatter.name + " - " + post.frontmatter.title} />
      <h1>{post.frontmatter.name}</h1>
      <h2>{post.frontmatter.title}</h2>
      <p>{post.html}</p>
    </Layout>
  )
}

export default TeamPage

export const teamQuery = graphql`
  query TeamBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        name
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
