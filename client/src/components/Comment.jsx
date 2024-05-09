import { useEffect, useState } from "react"
import moment from 'moment'


export default function Comment({comment}) {
    const [user,setUser] = useState({})
    console.log(user)
    useEffect(()=>{
        const getUsers = async () =>{
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json();
                if(res.ok) {
                    setUser(data)
                }
            } catch (error) {
               console.log(error.message) 
            }
        }
        getUsers();
    },[comment])
  return (
    <div className="flex border-b dark:border-gray-600 text-sm gap-2">
      <div className=" flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1 mt-2">
            <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}`:'anonymus user'}</span>
            <span className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 my-2">
            {
                comment.content
            }
        </p>
      </div>
    </div>
  );
}
