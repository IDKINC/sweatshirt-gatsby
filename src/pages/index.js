import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from 'gatsby-image'


const Container = styled.section`
  width: 100%;
  background: #212121;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Container></Container>
    
  </Layout>
)

export default IndexPage
