import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import MemberList from '../components/MemberList'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import NewsRoll from '../components/NewsRoll'
import Content, { HTMLContent } from '../components/Content'

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  description,
  showDonateLink,
  donateUrl,
  showNews,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
  <div>
    <div class="section intro">
      <div className="container">
        <div className="columns" style={{flexDirection: 'row-reverse'}}>
          {/* Right col */}
          <div className="column is-6-desktop is-6-tablet">
            {/* <PreviewCompatibleImage imageInfo={image} /> */}
            <div style={{position:'relative', paddingTop:'56.25%'}}>
              <iframe 
                style={{position:'absolute', top: 0, left:0, height: '100%', width: '100%'}}
                src="https://www.youtube-nocookie.com/embed/Pru_LDFySvE?rel=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            </div>
          </div>

          {/* Left col */}
          <div className="column is-6-desktop is-6-tablet">
            <h1 className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen h1">
              {heading}
            </h1>
            { subheading && <h2 className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen h2">
              {subheading}
            </h2>}
          </div>
        
        </div>

        <div className="columns" style={{paddingTop: '2em', borderTop: '2px solid rgb(0, 166, 255, .3)'}}>
          <div className="column is-9-desktop is-12-tablet">
            { description && <p>{description}</p>}
            { content && <div style={{marginTop: '1em'}}><PageContent className="content" content={content} /></div>}
            { (showDonateLink && donateUrl) && 
              <div>
                <br />
                <a className="button is-info" style={{backgroundColor: '#AD29B6'}} href={donateUrl}>Donate with JustGiving</a>
              </div>
            }
            </div>

        </div>
      </div>
    </div>

    <section className="section section-partners">
      <div className="container">
        <h2 id="members-list" className="is-size-3" style={{color: '#fff', paddingBottom:'10px', fontWeight: 'bold'}}>Members</h2>
        <MemberList />
      </div>
    </section>
    
    { showNews && 
    <section className="section section-news">
      <div className="container">
        
        <div className="columns">
          <div className="column is-12">
            <h3 className="has-text-weight-semibold is-size-3" style={{paddingBottom: '20px'}}>
              Latest news and updates
            </h3>
            <NewsRoll />
            <div className="has-text-centered">
              <Link className="button" to="/news">
                See all news
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
    }
  </div>
)}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  showDonateLink: PropTypes.bool,
  donateUrl: PropTypes.string,
  showNews: PropTypes.bool,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  // const { frontmatter } = data.markdownRemark
  const { markdownRemark: post } = data
  const { frontmatter } = post

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        showDonateLink={frontmatter.showDonateLink}
        donateUrl={frontmatter.donateUrl}
        showNews={frontmatter.showNews}
        contentComponent={HTMLContent}
        content={post.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  // data: PropTypes.shape({
  //   markdownRemark: PropTypes.shape({
  //     frontmatter: PropTypes.object,
  //   }),
  // }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
        showDonateLink
        donateUrl
        showNews
      }
    }
  }
`
