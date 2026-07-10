import { useNavigate } from "react-router-dom"
import { supabase } from "../utils/supabase"

interface BlogProps {
    id: number
    title: string,
    description: string,
    fetch: () => void
}

export default function Blog({id,title, description,fetch} : BlogProps) {
    // 1. passing the title & desc as props
    // 2. handle the Delete button logic for DB
    // 3. handle the Edit button logic (wish Update from the CRUD)

    const navigate = useNavigate();

    const handleDelete = async () => {
        const {data,error} = await supabase.from('blogs').delete().eq('id',id).select()
        if (error) {
            throw new Error('DB error');
        }
        if (data) {
            console.log('success');
            fetch();
        }
    }
    return (
        <div className="flex flex-col justify-between items-center border-2 bg-gray-300 rounded-2xl p-2 h-full w-full">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-lg text-black font-bold">{title}</h1>
                <p className=" italic">{description}</p>
            </div>
            <div className="flex flex-row justify-around items-center min-w-full mt-3 h-full">
                <button 
                    className="bg-red-500 p-1 px-1 rounded-2xl hover:cursor-pointer text-white font-semibold"
                    onClick={handleDelete}>Delete</button>
                <button 
                    className="bg-green-500 p-1 px-1 rounded-2xl min-w-10 hover:cursor-pointer text-white font-semibold"
                    onClick={() => navigate(`/${id}`)}>Edit</button>
            </div>
        </div>
    )
}