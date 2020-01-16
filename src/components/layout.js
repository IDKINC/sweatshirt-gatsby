/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../scss/style.scss"
import styled from "styled-components"

const Footer = styled.footer`
  width: 100%;
  padding: 3em;
  background: #212121;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  a{
    color: #fff;
  }

  h5{
    margin: 0;
  }
`



const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "100vw",
          padding: 0,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()}
          <h5>Sweatshirt Media</h5>
        </Footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
