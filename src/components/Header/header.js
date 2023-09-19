import React from "react"
import {Link} from "react-router-dom"

function Header(){
    return(
        <div className="flex items-center justify-between w-full h-20 px-10 bg-gray-100">
            <h2 className="font-bold text-lg">App Name</h2>
            <div className="flex flex-row space-x-4">
                <Link to='/signup'>SignUp</Link>
                <Link to='/'>SignIn</Link>
            </div>
            
        </div>
    )
}

export default Header;