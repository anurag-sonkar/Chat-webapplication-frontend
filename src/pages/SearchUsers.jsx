import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../features/users/userSlice';
import Card  from '../components/Card';

function SearchUsers() {
    const [searchKeyword , setSearchKeyword] = useState("")
    const {users , isLoading} = useSelector(state => state.user) 

const dispatch = useDispatch()

console.log(users)
    const handleSearch = (e)=>{
        e.preventDefault();

        dispatch(search(searchKeyword))

    }


    // showing some users 
    useEffect(
        ()=>{
            dispatch(search("@"))
        }, []
    )

    
    

    return (
        <div>
            <div className='flex justify-between'>
                {/* Search input box-2 for users search to make request */}
                <label className="input input-bordered flex items-center gap-2 min-w-[85%]">
                    <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearchKeyword(e.target.value)} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </label>
                <button className="btn btn-square btn-outline" onClick={(e) => handleSearch(e)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-6 w-6 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>

                </button>
            </div>
            {/* serach reposne */}
            <div className='custom-scrollbar'>
            {
                    searchKeyword === "" && <div className='text-2xl mt-4 px-1 font-semibold text-gray-400'>Friend Recommandations</div>
            }
            {
                    users?.length > 0 && users.map((user) => <Card key={user._id} {...user} />) 
            }

            </div>
        </div>
    )
}

export default SearchUsers