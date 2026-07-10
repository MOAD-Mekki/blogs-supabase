
import Home from './Home'
import Create from './CreateBlog'
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

   
   
  useEffect (() => {
    const fetchData = async () => {

       const {data, error} = await supabase.from('blogs').select();

        if (error) {
          throw new Error('Error in fetching data from DB');
        } else {
          setBlogs(data)
        }

    }

    fetchData();
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home blogs={blogs}/>}/>
          <Route path='/create' element={<Create />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
