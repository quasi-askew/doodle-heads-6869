const Login = ({ handleLogin }) => {
    return (
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
                <button onClick={() => handleLogin()}
                    type="button"
                    className="
                        py-4 
                        px-6 
                        bg-white 
                        hover:bg-pink-800 
                        hover:text-white
                        focus:ring-indigo-500 
                        focus:ring-offset-indigo-200 
                        text-indigo-800 
                        w-full 
                        transition 
                        ease-in 
                        duration-200 
                        text-center 
                        text-base 
                        font-bold 
                        shadow-md 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-offset-2 
                        rounded-lg 
                    "
                >
                    Login to Flow
                </button>
            </div>
        </div>
    )
}
export default Login;