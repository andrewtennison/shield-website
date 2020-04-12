import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { OutboundLink } from "gatsby-plugin-google-analytics"

class MemberList extends React.Component {

  memberBlock(member) {
    const website = (member.frontmatter.website && member.frontmatter.website.includes('www'));

    if(!member.frontmatter.memberlogo) return null;
    const image  = (
      <span>
        <PreviewCompatibleImage imageInfo={{ image: member.frontmatter.memberlogo, alt: `featured image thumbnail for member ${member.frontmatter.title}` }}/>
      </span>
    )

    return (
      <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop" key={member.id}>
        <div className="featured-thumbnail" style={{maxWidth: '300px'}}>
          { website 
            
            ? <OutboundLink href={member.frontmatter.website} target="_blank" rel="noopener noreferrer">{image}</OutboundLink>
            : <span>{image}</span>
          }
        </div>
      </div>
    ) 
  }

  render() {
    const { data } = this.props
    const { edges: members } = data.allMarkdownRemark

    console.log('members', members)

    const sortedMembers = members.sort((a,b) => {
      console.log(new Date(a.node.frontmatter.date), new Date(b.node.frontmatter.date))
      return (new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date))
    })

    console.log('sortedMembers', sortedMembers)

    return (
      <div className="columns is-multiline is-vcentered is-mobile">
        {members && members.map(({ node: member }) => this.memberBlock(member))}
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
                date
                website
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
