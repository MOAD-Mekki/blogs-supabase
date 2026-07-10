import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabase";

function Create() {
    // 1. input validation
    // 2. verifying if the form was empty
    // 3. submitting the new blog to the DB
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect (() => {
        inputRef.current?.focus();
    }, []);

    async function handleSubmit() {
        console.log(title, description);
        if (title === '' || description === '') {
            setError('* Please fill out all the fields')
        } else {
            setError(null)
            const {data, error} = await supabase.from('blogs').insert([{title,description}]).select();
            console.log(data);
            
            if (error) {
                setError('* DB Error');
            }
            if (data) {
                navigate('/');
            }
        }
    }

    return ( 
        <div className="flex flex-col justify-around items-center min-w-full h-screen">
            <h1 className="text-2xl text-black font-bold">Create New Blog</h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Write the blog's title" 
                    className=" min-w-100 bg-gray-200 border-black border-2 rounded-2xl p-1 px-2"
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}/>
                <textarea
                    name="description" 
                    placeholder="Write the blog's descriptionription" 
                    className=" bg-gray-200 min-w-100 min-h-50 border-2 border-black rounded-2xl p-1 px-2"
                    onChange={(e) => setDescription(e.target.value)}/>
                <p className="text-red-500 font-semibold" >{error}</p>
            </div>
            <button 
                className="border p-1 px-2 rounded-2xl bg-green-400 text-white font-semibold hover:scale-105 hover:cursor-pointer min-w-100 h-10"
                onClick={handleSubmit} >Save Blog</button>
        </div> 
    );
}

export default Create;