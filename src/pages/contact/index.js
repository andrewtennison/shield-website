import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div class="columns">
              <div class="column is-4">
                <div className="content">
                  <h1>Contact us</h1>
                  <p>In the first instance, please contact individual campaigns directly via the provided web links.</p>
                  <p>This website will be getting updated frequently with the latest information, so please check regularly.</p>
                  <p>If you or your organisation would like to join the effort, please fill in your details and we will be in contact.</p>
                </div>
              </div>
              <div class="column is-8">
                <form
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>

                  <h2 className="title is-3">Is your enquiry regarding</h2>

                  <div className="field">
                    <label className="label" htmlFor={'supply'}>
                      Supply of <span style={{fontWeight: 'normal'}}>(if required)</span>
                    </label>
                    <div className="control">
                      <div className="select">
                      <select 
                        name={'supply'}
                        onChange={this.handleChange}
                        id={'supply'}
                      >
                        <option value={''}>Please select an option</option>
                        <option value={'ppe_supplies'}>PPE supplies</option>
                        <option value={'medical_devices'}>Medical devices / parts (eg valves)</option>
                        <option value={'equipment'}>Equipment (ventilators / ovens)</option>
                        <option value={'food'}>Food</option>
                        <option value={'volunteers'}>Time / Volunteers</option>
                        <option value={'funding'}>Funding / Money</option>
                        <option value={'expertise'}>Pro-bono Expertise (design/legal/professional etc)</option>
                        <option value={'other'}>Other</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'request'}>
                      Your request for <span style={{fontWeight: 'normal'}}>(if required)</span>
                    </label>
                    <div className="control">
                      <div className="select">
                      <select 
                        name={'request'}
                        onChange={this.handleChange}
                        id={'request'}
                      >
                        <option value={''}>Please select an option</option>
                        <option value={'volunteers'}>Volunteers (eg Design / Logistics / IT / Accounting)</option>
                        <option value={'expertise'}>Pro-bono Expertise (eg Legal / Professional)</option>
                        <option value={'supplies'}>Real Estate / Money / Equipment</option>

                        <option value={'medical_devices'}>Medical devices / parts (eg valves)</option>
                        <option value={'equipment'}>Equipment (ventilators / ovens)</option>
                        <option value={'food'}>Food</option>
                        <option value={'funding'}>Funding / Money</option>
                        <option value={'other'}>Other</option>
                      </select>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="field">
                    <label className="label" htmlFor={'name'}>
                      Your name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'name'}
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'phone'}>
                      Phone number
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'tel'}
                        name={'phone'}
                        onChange={this.handleChange}
                        id={'phone'}
                        required={true}
                      />
                    </div>
                  </div>                  
                  <div className="field">
                    <label className="label" htmlFor={'email'}>
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'email'}
                        name={'email'}
                        onChange={this.handleChange}
                        id={'email'}
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor={'organisation'}>
                      Organisation name <span style={{fontWeight: 'normal'}}>(if applicable)</span>
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'name'}
                        onChange={this.handleChange}
                        id={'organisation'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'location'}>
                      Location
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'location'}
                        onChange={this.handleChange}
                        id={'location'}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor={'message'}>
                      Message
                    </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={'message'}
                        onChange={this.handleChange}
                        id={'message'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button is-link" type="submit">
                      Send
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
            <div className="content">
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
