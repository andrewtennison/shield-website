import React from 'react'

import Layout from '../../components/Layout'
import NewsRoll from '../../components/NewsRoll'

export default class NewsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/banner/n95-mask.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '1rem 3rem',
            }}
          >
            Latest News
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <NewsRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
