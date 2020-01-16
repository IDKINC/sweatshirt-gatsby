const _ = require("lodash");
const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`)
const { attachFields } = require(`gatsby-plugin-node-fields`)

function isArticleNode(node) {
    if (node.internal.type !== "MarkdownRemark") {
        return false;
    }


    return true;
}


const descriptors = [
    {
        predicate: isArticleNode,
        fields: [
            {
                name: 'published',
                getter: node => node.frontmatter.published,
                defaultValue: false
            },
            {
                name: 'weight',
                getter: node => node.frontmatter.weight,
                defaultValue: 0,
            },
            {
                name: 'ogImage',
                getter: node => node.frontmatter.ogImage,
                defaultValue: ''
            },
            {
                name: 'weight',
                getter: node => node.frontmatter.weight,
                defaultValue: 0
            }
        ]
    }
]

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField, deleteNode } = actions;


    if (_.get(node, "internal.type") === `MarkdownRemark`) {
        // Get the parent node
        const parent = getNode(_.get(node, "parent"));

        const slug = createFilePath({ node, getNode, basePath: `src/content/team` })
        createNodeField({
            node,
            name: `slug`,
            value: `${_.get(parent, "sourceInstanceName")}${slug}`,
        })

        createNodeField({
            node,
            name: "collection",
            value: _.get(parent, "sourceInstanceName")
        });


        attachFields(node, actions, getNode, descriptors)

    }

};




exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const docTemplate = path.resolve('src/templates/docTemplate.js');
    const blogTemplate = path.resolve('src/templates/blogTemplate.js');


    return graphql(`
  {
  team: allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/src/content/team/*.md"}}, limit: 1000) {
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
        fields{
            slug
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
                component: path.resolve("./src/templates/team.js"),
                context: {
                    slug: edge.node.fields.slug,
                }
            });

        });

    });
}
