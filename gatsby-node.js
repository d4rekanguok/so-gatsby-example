const path = require('path');

exports.onCreateNode = async ({
  node, loadNodeContent, actions, createContentDigest, createNodeId
}) => {
  if (node.internal.type !== 'File' || node.internal.mediaType !== 'text/html') return;

  const { createNode, createParentChildLink } = actions;
  const nodeContent = await loadNodeContent(node);

  const htmlNodeContent = {
    content: nodeContent,
    // use name as identifier
    name: node.name,
  }

  const htmlNodeMeta = {
    id: createNodeId(`html-${node.id}`),
    parent: node.id,
    internal: {
      type: 'HTMLContent',
      mediaType: 'text/html',
      content: JSON.stringify(htmlNodeContent),
      contentDigest: createContentDigest(htmlNodeContent),
    },
  }

  const htmlNode = Object.assign({}, htmlNodeContent, htmlNodeMeta);
  createNode(htmlNode);
  createParentChildLink({ parent: node, child: htmlNode });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const Template = path.resolve(__dirname, 'src/templates/blog-post.js')

  const result = await graphql(`
  {
    allHtmlContent {
      edges {
        node {
          name
          content
        }
      }
    }
  }
  `)

  if (result.errors) throw result.errors;
  result.data.allHtmlContent.edges.forEach(({ node }) => {
    createPage({
      path: node.name,
      component: Template,
      context: {
        name: node.name,
      }
    })
  })
}