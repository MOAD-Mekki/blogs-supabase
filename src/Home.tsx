
import Blog from "./componetns/Blog"
import { useNavigate } from "react-router-dom"

interface Blog {
  id: number,
  created_at: string,
  title: string,
  description: string,
}

interface HomeProps {
    blogs: Blog[] | null,
    fetch: () => void
}


export default  function Home({blogs,fetch}: HomeProps){
    // 1. mapping throw the data
    // 2. Giving data as a prop to the Blog Component
    // 3. styling the page

    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-10  items-center min-w-full min-h-screen">
            <nav className="min-w-full flex flex-row justify-between items-center bg-gray-300 border-b-2 border-gray-400 p-2">
                <h1 className="text-xl text-black font-bold">Blogs</h1>
                <button onClick={() => navigate('/create')} className=" text-white rounded-2xl p-1 px-2 bg-green-400 hover:scale-105 hover:cursor-pointer font-semibold">Create new Blog</button>
            </nav>
            <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-5 justify-around items-center min-w-full max-h-screen gap-3">
                {blogs && blogs.map((b) => {
                    return (
                        <div key={b.id} className="h-full w-full">
                            <Blog id={b.id} title={b.title} description={b.description} fetch={fetch}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}