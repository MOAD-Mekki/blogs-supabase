
import Home from './Home'
import Create from './CreateBlog'
import Update from './UpdateBlog'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './utils/supabase'

interface Blog {
  id: number,
  created_at: string,
  title: string,
  description: string
}

function App() {

    // 1. fetching data from the DB API

  const [blogs,setBlogs] = useState<Blog[] | null>(null)

  const fetchData = async () => {

       const {data, error} = await supabase.from('blogs').select();

        if (error) {
          throw new Error('Error in fetching data from DB');
        } else {
          setBlogs(data)
        }

    }
 
   
  useEffect (() => {
    fetchData();
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home blogs={blogs} fetch={fetchData}/>}/>
          <Route path='/create' element={<Create fetch={fetchData}/>}/>
          <Route path='/:id' element={<Update fetch={fetchData}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
