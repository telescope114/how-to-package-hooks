import React from 'react'
import { useNavigate } from 'react-router'
import { Link, Outlet } from 'react-router-dom'

const Home: React.FC = (props) => {

  return (<div>
    <div>
      <div>
        <Link to={'/count'}>count</Link>
      </div>
      <div>
        <Link to={'/fetch-hooks'}>fetch-hooks</Link>
      </div>
    </div>
    <Outlet/>
  </div>)
}

export default Home