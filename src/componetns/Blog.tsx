interface BlogProps {
    title: string,
    description: string,
}

export default function Blog({title, description} : BlogProps) {
    // 1. passing the title & desc as props
    // 2. handle the Delete button logic for DB
    // 3. handle the Edit button logic (wish Update from the CRUD)
    
    return (
        <div className="flex flex-col justify-center items-center border-2 bg-amber-50 rounded-2xl p-2 h-full">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg text-black font-bold">{title}</h1>
                <p className=" italic">{description}</p>
            </div>
            <div className="flex flex-row justify-around items-center min-w-full mt-3">
                <button className="bg-red-500 p-1 px-1 rounded-2xl hover:cursor-pointer">Delete</button>
                <button className="bg-green-500 p-1 px-1 rounded-2xl min-w-10 hover:cursor-pointer">Edit</button>
            </div>
        </div>
    )
}