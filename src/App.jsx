import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState('clapisbryan');

  const fetchUser = async (user) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser(username);
  }, []);

  console.log("Data: ", data);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(username);
  };



  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='text-center pb-10'>
          <h1 className='text-white text-2xl md:text-4xl font-bold'>GitHub Profile Viewer</h1>
        </div>
        <div className=' h-max sm:w-max lg:w-3xl shadow-2xl  bg-transparent border-2 border-white rounded-2xl'>
          <div className='p-2 lg:p-5 flex justify-end py-4'>
            <form
              className="w-full max-w-sm"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="search"
                className="block mb-2.5 text-sm font-medium sr-only"
              >
                Search
              </label>

              <div className="relative">
                <input
                  type="search"
                  id="search"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your GitHub username"
                  className="block w-full p-3 ps-9 rounded-lg border-2 text-white border-white"
                  required
                />

                <button
                  type="submit"
                  className="absolute end-1.5 bottom-1.5 text-white px-3 py-1.5 rounded-md  bg-transparent border-2 border-blue-600 hover:bg-blue-600 transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="sm:gap-5 p-5 lg:gap-10 md:py-10 md:px-45 flex justify-center items-center flex-col">
            <img src={data.avatar_url} alt="logo" className='size-16 md:size-30' />
            <div className='flex flex-col items-center'>
              <p className='text-2xl md:text-4xl font-bold text-white pb-2'>{data.name}</p>
              <p className='text-sm md:text-base text-white font-bold'>{data.location}</p>
            </div>
            {data.bio && (
              <div>
                <p className='text-sm md:text-base text-white text-center'>{data.bio}</p>
              </div>
            )}
            <div className='flex gap-10'>
              <div className='flex justify-center flex-col items-center'>
                <p className='text-2xl font-bold text-white'>{data.followers}</p>
                <p className='font-bold text-white'>Followers</p>
              </div>
              <div className='flex justify-center flex-col items-center'>
                <p className='text-2xl font-bold text-white'>{data.following}</p>
                <p className='font-bold text-white'>Following</p>
              </div>
              <div className='flex justify-center flex-col items-center'>
                <p className='text-2xl font-bold text-white'>{data.public_repos}</p>
                <p className='font-bold text-white'>Post</p>
              </div>
            </div>
            <div className='pt-8 md:pt-0'>
              <a href={data.html_url} className='bg-transparent border-2 border-white text-white font-bold px-8 py-2 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all text-decoration-none' target='_blank'>Show</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
