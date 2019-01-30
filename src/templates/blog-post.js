import React from 'react'
import { graphql } from 'gatsby'

const BlogPostTemplate = ({ data }) => {
  const post = data.htmlContent

  return <div dangerouslySetInnerHTML={{ __html: post.content }} />
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query HTMLPage($name: String!) {
    htmlContent(name: { eq: $name }) {
      id
      name
      content
    }
  }
`
