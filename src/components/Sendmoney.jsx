import React, {  useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { balance, transferto } from '../state'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

const Sendmoney = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(transferto)
    const [bal, setbal] = useRecoilState(balance)
    const [amount, setamount] = useState()
    const token = localStorage.getItem('token')
    
      const handleTransfer = async () => {
        try {
            const response = await axios.post('https://paytm-backend-5lfy.onrender.com/api/v1/account/transfer',{
                to:user.userId,
                amount: amount
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===400){
                alert("Transfer successful");
                navigate('/dashboard')
            }
            else{
                alert("Insufficient balance");
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
        }
      }
    
      
    
    

  return ( 
    <div className='flex flex-col justify-center items-center h-screen '>
        
        <div className='shadow'>
            <h1 className='text-center font-bold text-3xl m-10 ml-20 mr-20'>Send Money</h1>
            <div className='flex ml-2'>
                      <div className="flex ml-2 mr-2 h-7 w-7  items-center justify-center rounded-full bg-slate-200">
                      <p>{user.userName[0]}</p>
                      </div>
                      <label htmlFor="users" className=' text-sm font-bold md:text-xl  text-gray-900 dark:text-white'>{user.userName}</label>
            </div>
            
            <div className='flex flex-col m-4 mt-2'>
                <label htmlFor="password" className='mb-2 ml-2 text-sm  font-medium text-gray-900 dark:text-white'>Amount (in Rs)</label>
                <input type='text' id='amount' className='mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Enter amount" required onChange={e => setamount(e.target.value)}></input>
                <button type="submit" className="text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleTransfer}>Transfer</button>
            </div>
        </div>
    </div>
  )
}

export default Sendmoney