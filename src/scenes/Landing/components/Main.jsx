import React, { Component } from 'react'
import MainLayout from 'MainLayout'
import { getArtistPopularSongs } from 'services/network/api'

class Main extends Component {
  state = {
    relatedSongs: [],
  }
  componentWillReceiveProps(nextProps) {
    const { auth: { access_token, token_type }, getMainProps } = nextProps
    const { relatedArtists } = getMainProps()

    if (this.props.getMainProps().relatedArtists !== relatedArtists) return

    const songsRequests = relatedArtists
      .slice(0, 10)
      .map(({ id }) => getArtistPopularSongs({ id, access_token, token_type }))

    Promise.all(songsRequests)
      .then(res => Promise.all(res.map(net => net.json())))
      .then(data => this.setState(state => ({ ...state, relatedSongs: data })))
      .catch(() => {
        //handle error
      })
  }
  render() {
    const { auth, getMainProps } = this.props
    const { relatedArtists } = getMainProps()
    return (
      <MainLayout>
        {() => {
          return (
            <>
              <h2 className="text-sm uppercase mb-4 font-normal text-grey-dark">
                Similar Artist
              </h2>
              <ul className="text-grey-darker mb-8">
                {relatedArtists.length > 0
                  ? relatedArtists
                      .slice(0, 10)
                      .map(({ name, id }) => <li key={id}>{name}</li>)
                  : 'Sorry, No related artist found'}
              </ul>
              <h2 className="text-sm uppercase mb-4 font-normal text-grey-dark">
                Similar songs
              </h2>
              <ul className="text-grey-darker">
                {this.state.relatedSongs.length > 0
                  ? this.state.relatedSongs.slice(0, 10).map(({ tracks }) => (
                      <ul className="flex flex-wrap mb-8">
                        {tracks.map(({ name, id }) => (
                          <li key={id} className="mr-4">
                            {name}
                          </li>
                        ))}
                      </ul>
                    ))
                  : 'Sorry, no similar songs found'}
              </ul>
            </>
          )
        }}
      </MainLayout>
    )
  }
}

export default Main
