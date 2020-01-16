import { Link } from "gatsby"
import PropTypes from "prop-types"

import styled from "styled-components"

import React from "react"

const Card = styled.div`
  background: #fff;
  // padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 100%;
  border-bottom: 10px solid #000;
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
  padding: 0 1em;
  width: 100%;

  h4,
  h5 {
    margin: 0;
  }
  h5{
    text-align: right;
  }
`

const ProjectCard = ({ project }) => (
  <Card>
    <Link
      to={project.fields.slug}
      style={{ textDecoration: `none`, color: "#212121" }}
    >
      <img src={project.frontmatter.featuredImage.childImageSharp.resize.src} />
      <Meta>
        <h4>{project.frontmatter.title}</h4>
        <h5>
          {project.fields.type}{" "}
          {project.fields.clients.length ? "for " + project.fields.clients : ""}
        </h5>
      </Meta>
    </Link>
  </Card>
)

ProjectCard.propTypes = {
  project: PropTypes.object,
}

ProjectCard.defaultProps = {
  project: ``,
}

export default ProjectCard
