import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userAuth } from '../state';

const Signup = () => {
    const navigate = useNavigate();
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(null)
    const setAuth = useSetRecoilState(userAuth);

    async function createAccount(e) {
        e.preventDefault();

        try {
            const response = await axios.post('https://paytm-backend-5lfy.onrender.com/api/v1/user/signup', {
                username,
                firstname,
                lastname,
                password
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                navigate('/dashboard');
            }
            else {
                seterror(response.statusText);
            }
        } catch (error) {

            console.log(error);
        }
    }

    
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen mt-10 md:mt-0">
            <div className='mb-2'>
                <h1 className='font-bold text-4xl'>Sign Up</h1>
            </div>
            <div className='mb-2  text-gray-700'>
            <p>Enter information to create an account</p>
            {error && <p className='text-red-500 font-medium'>error</p>}
            </div>
            <form className="max-w-md mx-auto" onSubmit={createAccount}>
                <div className='mb-2'>
                    <label htmlFor="firstname" className='block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white'>Firstname</label>
                    <input type='text' id='firstname' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="John" required onChange={e => setfirstname(e.target.value)}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor="lastname" className='block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white'>Lastname</label>
                    <input type='text' id='lastname' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Smith" required onChange={e => setlastname(e.target.value)}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor="username" className='block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white'>username</label>
                    <input type='username' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="name@gmail.com" required onChange={e => setusername(e.target.value)}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor="password" className='block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white'>Password</label>
                    <input type='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="xxxxxxxx" required onChange={e => setpassword(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit" className="text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
                <div>
                <label htmlFor="login" className="text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account?<a href="/signin" className="text-gray-900 underline hover:underline dark:text-blue-500">Login</a></label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup