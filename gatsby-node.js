const _ = require("lodash")
const path = require("path")

const { createFilePath } = require(`gatsby-source-filesystem`)
const { attachFields } = require(`gatsby-plugin-node-fields`)

function isArticleNode(node) {
  if (node.internal.type !== "MarkdownRemark") {
    return false
  }

  return true
}

const descriptors = [
  {
    predicate: isArticleNode,
    fields: [
      {
        name: "published",
        getter: node => node.frontmatter.published,
        defaultValue: false,
      },
      {
        name: "weight",
        getter: node => node.frontmatter.weight,
        defaultValue: 0,
      },
      {
        name: "ogImage",
        getter: node => node.frontmatter.ogImage,
        defaultValue: "",
      },
      {
        name: "weight",
        getter: node => node.frontmatter.weight,
        defaultValue: 0,
      },
      {
        name: "youtubeLink",
        getter: node => node.frontmatter.youtubeLink,
        defaultValue: "",
      },
      {
        name: "externalLink",
        getter: node => node.frontmatter.externalLink,
        defaultValue: "",
      },
      {
        name: "clients",
        getter: node => node.frontmatter.clients,
        defaultValue: [],
      },
      {
        name: "type",
        getter: node => node.frontmatter.type,
        defaultValue: "Project",
      },
    ],
  },
]

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, "parent"))

    const slug = createFilePath({ node, getNode, basePath: `src/content` })
    createNodeField({
      node,
      name: `slug`,
      value: `${_.get(parent, "sourceInstanceName")}${slug}`,
    })

    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName"),
    })

    attachFields(node, actions, getNode, descriptors)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  return graphql(`
    {
      team: allMarkdownRemark(
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
        filter: {
          fileAbsolutePath: { glob: "**/src/content/portfolio/**/*.md" }
        }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
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
              youtubeLink
              externalLink
              clients
              type
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    _.each(result.data.team.edges, (edge, index) => {
      createPage({
        path: `${edge.node.fields.slug}`,
        component: path.resolve("./src/templates/team-member__page.js"),
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })

    _.each(result.data.portfolio.edges, (edge, index) => {
      console.log(edge.node.fields.slug)

      createPage({
        path: `${edge.node.fields.slug}`,
        component: path.resolve("./src/templates/project__page.js"),
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
  })
}
