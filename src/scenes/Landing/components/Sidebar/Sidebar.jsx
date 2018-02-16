import React from 'react'
import SidebarLayout from 'SidebarLayout'
import Search from './components/Search'

const Sidebar = ({ auth, getSearchProps }) => (
  <SidebarLayout>
    {() => (
      <>
        <div className="lg:mb-8 lg:pb-8 overflow-hidden">
          <Search auth={auth} getSearchProps={getSearchProps} />
        </div>
        <h2 className="lg:my-8 text-sm font-normal text-grey-dark">Explore</h2>
        <nav>
          <ul className="list-reset">
            <li className="flex items-center">
              <i className="h-6 border-l-2 border-r-2 border-blue border-solid rounded" />
              <i className="mr-8 ml-4 ion-ios-people" />
              <span className="text-sm tracking-wide">Similar</span>
            </li>
          </ul>
        </nav>
      </>
    )}
  </SidebarLayout>
)

export default Sidebar
