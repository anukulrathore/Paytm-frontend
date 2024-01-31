import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { balance, userAuth } from "../state"
import axios from "axios"
import Searchusers from "./Searchusers";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bal,setbal] = useRecoilState(balance);
  const [filter, setfilter] = useState()
  const [users, setusers] = useState([])
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(userAuth);

  useEffect(() => {
    async function fetchUsers(){
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter)
        setusers(response.data.user);
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchUsers()
    
  }, [filter])
  
  async function getbalance(){
    try {
      const response = await axios.get('http://localhost:3000/api/v1/account/balance',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status===200){
        setbal(response.data.balance);
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  getbalance();
  
  const handleSignout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/signin');
  }

  return (
    <div>
      <div className='flex justify-between border-b pb-2 shadow-md'>
        <h1 className='font-bold text-2xl m-2'>Payments App</h1>
        <div className="flex items-center justify-center">
          <p className='font-medium m-2'>Hello, User</p>
          <div className="flex h-7 w-7 mr-2 items-center justify-center rounded-full bg-slate-200">
            <p>U</p>
          </div>
          <button type="submit" className="text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 m-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSignout}>Sign Out</button>
        </div>
        
      </div>
      <div className=" m-2 p-2">
        <div className="font-bold flex text-xl">
          <p className="mr-2">Your Balance</p>
          <p className="">$ {bal}</p>
        </div>
        <div className='mb-2'>
                      <label htmlFor="searchusers" className='block mb-2 text-sm font-bold md:text-xl  text-gray-900 dark:text-white'>Users</label>
                      <input type='text' id='users' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Search users..." required onChange={e => setfilter(e.target.value)} ></input>
        </div>

        <Searchusers users={users}></Searchusers>
        

      </div>
      

    </div>
  )
}

export default Dashboard