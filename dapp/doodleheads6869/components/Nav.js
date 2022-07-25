const Nav = () => {
    return (
        <div className="navbar bg-pink-800">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl text-white">DoodleHeads6869</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </label>
                    <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-green-900 rounded-box w-52">
                        <li>
                            <a className="justify-between text-indigo-800">
                                DoodProfile
                            </a>
                        </li>
                        <li><a className="text-indigo-800">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav;