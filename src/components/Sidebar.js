import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { MDBTooltip } from "mdb-react-ui-kit"
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import decode from "jwt-decode";

const Sidebar = () => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const location = useLocation();
    const nowLocation = location.pathname
    const token = user?.token;

    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(setLogout());
        }
    }

    const handleLogout = () => {
        dispatch(setLogout());
    };

  return (
    <div className="sidebar">
        <div className="logo-details">
          {/* <i><img src="/images/smalllogo.jpg" alt='DDS'/></i> */}
          <span className="logo_name"></span>
        </div>
          <ul className="nav-links">
            <li>
            {nowLocation === "/" ? (
                <MDBTooltip
                tag="b"
                title={`Dashboard`}
                placement="right"
              >
                <Link to={"/"} className="active">
                  <i className='bx bx-layout' ></i>
                </Link>
                </MDBTooltip>
            ) : (
                <MDBTooltip
              tag="b"
              title={`Dashboard`}
              placement="right"
            >
              <Link to={"/"} reloadDocument>
                <i className='bx bx-layout' ></i>
              </Link>
              </MDBTooltip>
            )}
            </li>
            {user?.result?.role === "creator" && nowLocation !== "/create" && (
                <li>
                <MDBTooltip
                  tag="b"
                  title={`Create`}
                  placement="right"
                >
                  <Link to={"/create"} reloadDocument>
                    <i className='bx bx-plus-circle' ></i>
                  </Link>
                  </MDBTooltip>
                </li>
            )}
            {user?.result?.role === "creator" && nowLocation === "/create" && (
                <li>
                <MDBTooltip
                  tag="b"
                  title={`Create`}
                  placement="right"
                >
                  <Link to={"/create"} className="active">
                    <i className='bx bx-plus-circle' ></i>
                  </Link>
                  </MDBTooltip>
                </li>
            )}
            <li>
            {nowLocation === "/all" ? (
                <MDBTooltip
                tag="b"
                title={`All Notas`}
                placement="right"
              >
                <Link to={"/all"} className="active">
                  <i className='bx bx-book' ></i>
                </Link>
                </MDBTooltip>
            ) : (
                <MDBTooltip
              tag="b"
              title={`All Notas`}
              placement="right"
            >
              <Link to={"/all"} reloadDocument>
                <i className='bx bx-book' ></i>
              </Link>
              </MDBTooltip>
            )}
            </li>
            {user?.result && (
              <li className="log_out">
              <MDBTooltip
                tag="b"
                title={`Log Out`}
                placement="right"
              >
                <Link to={"/login"} onClick={handleLogout}>
                  <i className='bx bx-log-out'></i>
                </Link>
                </MDBTooltip>
              </li>
            )}
          </ul>
      </div>
  )
}

export default Sidebar