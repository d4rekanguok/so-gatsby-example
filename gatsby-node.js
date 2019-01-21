const fs = require('fs')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const { dir } = path.parse(post.node.fileAbsolutePath);
      const hasHero = fs.existsSync(path.join(dir, 'hero.jpg'));
      if (hasHero) {
        const query = `
        {
          imageSharp(fields: {
            dir: { eq: "${dir}" }
          }) {
            id
          }
        }
        `
        graphql(query).then(result => {
          if (result.errors) throw result.errors
          const heroId = result.data.imageSharp.id
          console.log(heroId);
        })
      }

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `ImageSharp` && node.parent) {
    const { dir } = getNode(node.parent);
    createNodeField({
      node,
      name: 'dir',
      value: dir,
    })
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
