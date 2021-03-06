import addToMailchimp from "gatsby-plugin-mailchimp"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"
import React from "react"
export default class MailChimpForm extends React.Component {
  constructor() {
    super()
    this.state = { email: "", result: {} }
  }

  _handleSubmit = async e => {
    console.log("handle sub")
    e.preventDefault()
    const result = await addToMailchimp(this.state.email, { EMAIL: this.state.email })
    if (result.result === 'error') {
      alert(`Whoops, ${this.state.email} you're already subscribed!`)
    } else {
      alert(`Thank you for subscribing ${this.state.email}!`)
    }
    console.log("result", result)
    this.setState({ result: result })
  }

  handleChange = event => {
    this.setState({ email: event.target.value })
  }
  render() {
    return this.state.result == "success" ? (
      <div>SUCCESS</div>
    ) : this.state.result == "error" ? (
      <div>ERROR</div>
    ) : (
      <form onSubmit={this._handleSubmit}>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          variant="outlined"
          onChange={this.handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
        >
          <Typography variant="button">Envoyer</Typography>
        </Button>
      </form>
    )
  }
}
