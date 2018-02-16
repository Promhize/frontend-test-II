import React from 'react'
import { func } from 'prop-types'

const SidebarLayout = ({ children, props }) => (
  <aside className="lg:h-screen lg:w-1/4 w-full bg-white lg:p-8 p-8 shadow-lg">
    {children(props)}
  </aside>
)

SidebarLayout.propTypes = {
  children: func.isRequired,
}

export default SidebarLayout
