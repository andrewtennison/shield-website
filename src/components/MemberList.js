import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class MemberList extends React.Component {
  render() {
    const { data } = this.props
    const { edges: members } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {members &&
          members.map(({ node: member }) => (
            <div className="column" key={member.id}>
                {member.frontmatter.memberlogo ? (
                <div className="featured-thumbnail" style={{maxWidth: '300px'}}>
                    <PreviewCompatibleImage
                    imageInfo={{
                        image: member.frontmatter.memberlogo,
                        alt: `featured image thumbnail for member ${member.frontmatter.title}`,
                    }}
                    />
                </div>
                ) : null}
            </div>
          ))}
      </div>
    )
  }
}

MemberList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query MemberListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "member-page" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                memberlogo {
                  childImageSharp {
                    fluid(maxWidth: 300, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MemberList data={data} count={count} />}
  />
)
