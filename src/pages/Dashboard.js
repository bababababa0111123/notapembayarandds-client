import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MDBBtn } from 'mdb-react-ui-kit'

const Dashboard = () => {
  const {loading} = useSelector((state) => ({...state.nota})) 
  const {user} = useSelector((state) => ({...state.auth}))

  // useEffect(() => {
  //   dispatch(dashboardChecker())
  // }, [])

  if (loading) {
    return <Spinner />;
  } 

  return (
    <div>
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        <div className='home-section'>
            <div className='home-content main' style={{ paddingBottom: "50px", paddingTop: "45px", textAlign: "center"}}>
                <h3>Welcome!</h3>
                {!user?.result && (
              <div>
                <p>Silakan login melalui link di bawah ini</p>
                <Link to={"/login"}>
                  <MDBBtn>Login</MDBBtn>
                </Link>
              </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default Dashboard