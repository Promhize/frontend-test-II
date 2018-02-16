import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Sidebar from 'Landing/components/Sidebar'
import Main from 'Landing/components/Main'
import Giphy from 'Landing/components/Giphy'

class Landing extends Component {
  state = {
    relatedArtists: [],
  }
  render() {
    const { auth } = this.props
    return (
      <div className="flex flex-wrap">
        <Sidebar auth={auth} getSearchProps={this.getSearchProps} />
        <Main auth={auth} getMainProps={this.getMainProps} />
        <Giphy auth={auth} />
      </div>
    )
  }
  state_setRelatedArtists = relatedArtists =>
    this.setState(state => ({ ...state, relatedArtists }))

  getSearchProps = () => ({
    state_setRelatedArtists: this.state_setRelatedArtists,
  })
  getMainProps = () => ({
    relatedArtists: this.state.relatedArtists,
  })
}

export default withRouter(Landing)
