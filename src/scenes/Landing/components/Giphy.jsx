import React, { Component } from 'react'
import SidebarLayout from 'SidebarLayout'
import Autosuggest from 'react-autosuggest'

import { searchGifs } from 'services/network/api'

const lastWordStartsWithColon = string =>
  string.split(' ').slice(-1)[0][0] === ':'

class Giphy extends Component {
  state = {
    gifs: [],
    loading: false,
    message: '',
    messages: [],
    tempGifUrls: [],
    showGifs: false,
    selectedGifs: [],
  }

  render() {
    const {
      handleTextboxKeyPress,
      state_setMessage,
      state_addSelectedGif,
    } = this
    const { gifs, message } = this.state
    return (
      <SidebarLayout>
        {() => (
          <div className="h-full overflow-y-scroll flex flex-col ">
            <h2 className="mb-6">Giphy</h2>
            <div>
              <Autosuggest
                suggestions={gifs}
                onSuggestionSelected={(value, { suggestion }) => {
                  state_addSelectedGif(suggestion)
                }}
                onSuggestionsFetchRequested={({ value, reason }) => {
                  if (!lastWordStartsWithColon(value))
                    return this.setState(state => ({ ...state, gifs: [] }))
                  this.setState(state => ({ ...state, loading: true }))
                  searchGifs(value)
                    .then(res => res.json())
                    .then(({ data: gifs }) =>
                      this.setState(state => ({
                        ...state,
                        gifs,
                        loading: false,
                      }))
                    )
                    .catch(console.error)
                }}
                onSuggestionsClearRequested={() => {}}
                getSuggestionValue={({
                  title,
                  id,
                  images: { downsized: { url } },
                }) => {
                  const wordsArray = message.split(' ')
                  wordsArray.splice(-1, 1, `:${title}: `)
                  this.setState(state => ({
                    ...state,
                    tempGifUrls: [
                      ...state.tempGifUrls,
                      {
                        miniUrl: url,
                        id,
                        title,
                      },
                    ],
                  }))
                  return wordsArray.join(' ')
                }}
                inputProps={{
                  placeholder: "try typing 'awesome :gifs'",
                  onChange: state_setMessage,
                  onKeyPress: handleTextboxKeyPress,
                  value: this.state.message,
                  className:
                    'w-full text-base font-bold bg-grey-lighter p-4 capitalize',
                }}
                renderSuggestion={({ id, images: { downsized: { url } } }) => (
                  <figure key={id} className="w-1/3 h-24 overflow-hidden">
                    <img src={url} alt="" className="max-w-5xl w-auto h-full" />
                  </figure>
                )}
                shouldRenderSuggestions={() => true}
              />
              <span className="text-xm font-italic text-grey">
                Done typing? Hit enter
              </span>
            </div>
            <div>
              {this.state.messages.map((message, i) =>
                this.renderMessage(message, i)
              )}
            </div>
          </div>
        )}
      </SidebarLayout>
    )
  }
  state_setMessage = ({ target }, { newValue: message }) =>
    this.setState(state => ({ ...state, message }))
  state_addSelectedGif = gif =>
    this.setState(
      state => ({
        ...state,
        selectedGifs: [...state.selectedGifs, gif],
      }),
      () => console.log(this.state)
    )
  state_addMessage = message =>
    this.setState(state => ({
      ...state,
      messages: [...state.messages, message],
    }))
  handleTextboxKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      this.state_addMessage({
        value,
        gifs: this.state.tempGifUrls,
      })
    }
  }
  renderMessage = ({ value, gifs }, index) => {
    const messageArr = gifs.reduce((acc, gif) => {
      const arr = acc.split(`:${gif.title}:`)
      arr.splice(
        1,
        0,
        <div className="h-24">
          <img src={gif.miniUrl} alt="gif.title" />{' '}
        </div>
      )
      return arr
    }, value)
    return <div key={`${value}${index}`}>{messageArr}</div>
  }
}

export default Giphy
