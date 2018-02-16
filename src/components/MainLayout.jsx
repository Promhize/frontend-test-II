import React from 'react'
import { func } from 'prop-types'

const MainLayout = ({ children, props }) => (
  <main className="lg:w-1/2 w-full lg:h-screen text-white lg:p-8 lg:overflow-y-scroll">
    {children(props)}
  </main>
)

MainLayout.propTypes = {
  children: func.isRequired,
}

export default MainLayout
