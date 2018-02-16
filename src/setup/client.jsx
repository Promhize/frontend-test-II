import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import View from 'services/routing'
// import store from 'redux/store'
import './css/styles.css'

const renderApp = Component =>
  render(
    <AppContainer>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Component />
      </BrowserRouter>
      {/* </Provider> */}
    </AppContainer>,
    document.getElementById('dc-test'),
    () => {
      // import('raven-js').then(raven =>
      //   raven
      //     .config('https://ba3f7fdb360041f0ad35c16ed0f02646@sentry.io/263366')
      //     .install()
      // )
    }
  )

renderApp(View)

if (module.hot) {
  module.hot.accept('services/routing', () => {
    import('services/routing').then(app => renderApp(app.default))
  })
}
