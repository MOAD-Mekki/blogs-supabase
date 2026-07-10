import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./utils/supabase";

interface FetchProp {
    fetch: () => void
};

interface DataBlog {
  id: number,
  created_at: string,
  title: string,
  description: string,
};

function Update({fetch}: FetchProp) {
    // 1. input validation
    // 2. verifying if the form was empty
    // 3. submitting the new blog to the DB
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect (() => {
        inputRef.current?.focus();
        fetchBlog();
    }, [id]);

    async function handleUpdate() {
        console.log(title, description);
        if (title === '' || description === '') {
            setError('* Please fill out all the fields')
        } else {
            setError(null)
            const {data, error} = await supabase.from('blogs').update([{title,description}]).eq('id', Number(id)).select();
            console.log(data);
            
            if (error) {
                setError('* DB Error');
            }
            if (data) {
                fetch();
                navigate('/');
            }
        }
    }

    async function fetchBlog() {
        const {data, error} = await supabase.from('blogs').select().eq('id', Number(id)).single();

        if (error) {
            setError('DB error');
        } else {
            setTitle(data.title)
            setDescription(data.description)
        }
    }

    return ( 
        <div className="flex flex-col justify-baseline gap-5 items-center min-w-full h-screen">
            <div className="flex flex-col min-w-full justify-baseline items-start h-15">
                <h1 
                    className="text-xl font-semibold hover:cursor-pointer" 
                    onClick={() => navigate('/')}>  {'<--'} Return to Home
                </h1>
            </div>

            <h1 className="text-2xl text-black font-bold">Update Blog</h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Write the blog's title" 
                    className=" min-w-100 bg-gray-200 rounded-2xl p-1 px-2"
                    value={title}
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}/>
                <textarea
                    name="description" 
                    placeholder="Write the blog's descriptionription" 
                    className=" bg-gray-200 min-w-100 min-h-50 rounded-2xl p-1 px-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                <p className="text-red-500 font-semibold" >{error}</p>
            </div>
            <button 
                className="border p-1 px-2 rounded-2xl bg-green-400 text-white font-semibold hover:scale-105 hover:cursor-pointer min-w-100 h-10"
                onClick={handleUpdate} >Save Blog</button>
        </div> 
    );
}

export default Update;