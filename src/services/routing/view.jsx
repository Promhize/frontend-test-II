import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Auth from 'Auth'

import Landing from 'Landing'

export const View = () => (
  <Switch>
    <Auth path="/" component={Landing} />
  </Switch>
)
