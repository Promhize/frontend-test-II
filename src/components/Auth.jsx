import React, { Component } from 'react'
import { parse } from 'querystringify'

const authStatus = ['accepted', 'denied', 'pending']
const userAccepted = () => authStatus[0]
const userRejected = () => authStatus[1]
const userPending = () => authStatus[2]

const authPendingRender = () => {
  window.location.href = `https://accounts.spotify.com/en/authorize?client_id=ad85c629c2f64232a0ad2e00aaad6bbd&response_type=token&redirect_uri=${encodeURIComponent(
    'http://localhost:2020'
  )}`
  return null
}

class Auth extends Component {
  state = {
    auth: {
      access_token: '',
      token_type: '',
      expires_in: '',
    },
  }
  componentWillMount() {
    const { location: { hash } } = this.props
    const auth = parse(hash.substring(1))
    if (hash !== '') {
      this.state_setAuth(auth)
    }
  }
  render() {
    const { location: { search, hash }, component: Component } = this.props
    const { auth } = this.state
    const renderBasedOnStatus = [
      () => <Component auth={{ ...auth, status: true }} />,
      () => <Component auth={{ ...auth, status: false }} />,
      authPendingRender,
    ]

    const authStatusIndex = authStatus.indexOf(this.verifyAuth(search))
    const render = renderBasedOnStatus[authStatusIndex]

    return <div>{render()}</div>
  }

  state_setAuth = auth =>
    this.setState(state => ({ ...state, auth: { ...state.auth, ...auth } }))

  verifyAuth = (querySearch, queryHash) =>
    this.state.auth.access_token !== ''
      ? userAccepted()
      : querySearch !== '' ? userRejected() : userPending()
}

export default Auth
