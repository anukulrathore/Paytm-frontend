import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { transferto } from "../state"



const Searchusers = ({users}) => {
  const setData = useSetRecoilState(transferto)
  const navigate = useNavigate();

  const handleSubmit = (user) =>{
    setData({
      userId:user._id,
      userName:user.firstname
    })
    navigate('/sendmoney')
  }

  return (
    <div>
        {users.map(user=>(
            <div className='m-4 flex justify-between' key={user._id}>
            <div className="flex justify-start">
              <div className="flex h-7 w-7 mr-2 items-center justify-center rounded-full bg-slate-200">
                <p>U</p>
              </div>
              <label htmlFor="users" className='  mb-2 text-sm font-bold md:text-xl  text-gray-900 dark:text-white'>{user.firstname}</label>
            </div>
            <button type="submit" className=" text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> handleSubmit(user)}>Submit</button>
          </div>
          ))}
    </div>
  )
}

export default Searchusers