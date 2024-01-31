import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"
import Sendmoney from "./components/Sendmoney"
import ProtectedRoute from "./components/ProtectedRoute"



function App() {
    <Router>
      <Route path="/signup" component={Signup}></Route>
    </Router>

  return (
    <Router>
      <Routes>
        
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path='/dashboard' element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
        } />

        <Route path='/sendmoney' element={
                <ProtectedRoute>
                    <Sendmoney />
                </ProtectedRoute>
        } />
        {/* <Route path="/*" element={<Signup />}></Route> */}
        {/* <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/sendmoney" element={<Sendmoney />}></Route> */}
      </Routes>
    </Router>
  )
}

export default App
