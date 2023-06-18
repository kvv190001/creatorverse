import React, { useState, useEffect } from 'react'
import './App.css'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import { useRoutes } from "react-router-dom";
import { supabase } from './client'

const App = () => {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select()
        .order('created_at', { ascending: true })

      setCreators(data)
    }

    fetchCreators()
  }, [])

  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators data={creators} />
    },
    {
      path: "/new",
      element: <AddCreator />
    },
    {
      path: "/edit/:id",
      element: <EditCreator data={creators} />
    },
    {
      path: "/:id",
      element: <ViewCreator data={creators} />
    }
  ])


  return (
    <div className='App'>
      <header>
        <div className='header-info'>
          <h1>CREATORVERSE</h1>
          <nav>
            <ul className='header-nav-items'>
              <li><a href='/' role='button' className='header-nav-item'>View All Creators</a></li>
              <li><a href='/new' role='button' className='header-nav-item'>Add a Creator</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  )
}

export default App
