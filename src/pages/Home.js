import React, {useEffect, useState} from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { getNotas, setCurrentPage } from '../redux/features/notaSlice';
import CardNota from '../components/CardNota';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Spinner from "../components/Spinner";
import { notasFilter } from '../redux/features/notaSlice';

const Home = () => {
  const [searchQuery, setSearch] = useState();
  const [startDate, setStart] = useState()
  const [endDate, setEnd] = useState();
  const [statusQuery, setStatus] = useState();  
  const { notas, currentPage, loading, numberOfPages } = useSelector((state) => ({...state.nota}));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotas(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if(searchQuery === undefined && startDate && endDate && statusQuery === undefined) {
      dispatch(notasFilter({ startDate, endDate }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery === "" && startDate && endDate && statusQuery === undefined) {
      dispatch(notasFilter({ startDate, endDate }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery === undefined && startDate && endDate && statusQuery === "all") {
      dispatch(notasFilter({ startDate, endDate }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery === "" && startDate && endDate && statusQuery === "all") {
      dispatch(notasFilter({ startDate, endDate }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery && startDate && endDate && statusQuery === undefined) {
      dispatch(notasFilter({ startDate, endDate, searchQuery }));
      navigate(`/notas/filter?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery && startDate && endDate && statusQuery === "all") {
      dispatch(notasFilter({ startDate, endDate, searchQuery }));
      navigate(`/notas/filter?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`)
    }
    if(searchQuery === undefined && startDate && endDate && statusQuery) {
      dispatch(notasFilter({ startDate, endDate, statusQuery }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}&statusQuery=${statusQuery}`)
    }
    if(searchQuery === "" && startDate && endDate && statusQuery) {
      dispatch(notasFilter({ startDate, endDate, statusQuery }));
      navigate(`/notas/filter?startDate=${startDate}&endDate=${endDate}&statusQuery=${statusQuery}`)
    }
    if (searchQuery && startDate && endDate && statusQuery) {
      dispatch(notasFilter({ searchQuery, startDate, endDate, statusQuery }));
      navigate(`/notas/filter?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}&statusQuery=${statusQuery}`)
    }
  }

  const handleReset = (e) => {
    navigate("/all")
  }

  if (loading) {
    return <Spinner />;
  } 
  
    return (
    <div>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <section className="home-section">
        <div className="home-content" style={{minHeight: "calc(100vh + 60px)", paddingTop: '45px'}}>
          <div>
            <MDBContainer>
              <MDBRow>
              <form>
                <MDBCol size='md' style={{marginTop: "1rem"}}>
                  <div className="search-box" style={{display: "flex"}}>
                    <input 
                      className='inputsearchcss'
                      type="text"
                      placeholder="Search..."
                      onChange = {(e) => setSearch(e.target.value)}
                      style={{minWidth: "0"}}
                      defaultValue={searchQuery}
                    />
                    <i className='bx bx-search'></i>
                  </div>
                </MDBCol>
                <MDBCol size='md' style={{marginTop: "1rem"}}>
                <div style={{display: "flex"}}>
                <div style={{marginRight: "0.2rem", width: "calc(100%/3)", minWidth: "0"}}>
                <MDBInput 
                  type="date"
                  label="start"
                  onChange={(e) => setStart(e.target.value)}
                  style={{minWidth: "0"}}
                  defaultValue={startDate}
                  required
                />
                </div>
                <i className='fa fa-solid fa-star' style={{fontSize: "7px", color: "red", marginRight: "0.5rem"}}></i>
                <div style={{marginRight: "0.2rem", width: "calc(100%/3)", minWidth: "0"}}>
                <MDBInput
                  type="date"
                  label="end"
                  onChange= {(e) => setEnd(e.target.value)}
                  style={{minWidth: "0"}}
                  defaultValue={endDate}
                  required
                />
                </div>
                <i className='fa fa-solid fa-star' style={{fontSize: "7px", color: "red"}}></i>
                </div>
                </MDBCol>
                <MDBCol size='md' style={{marginBottom: "1rem", marginTop: "1rem"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                <label>Status</label>
                <select 
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  style={{width: "max-content", minWidth: "0", backgroundColor: "transparent", margin: "0 0.5rem"}}
                  defaultValue={statusQuery}
                >
                  <option value="e">All</option>
                  <option value="notCheckedYet">Belum di-approve</option>
                  <option value="alreadyChecked">Sudah di-approve</option>
                  <option value="payed">Sudah dibayar</option>
                </select>
                </div>
                </MDBCol>
                <MDBBtn onClick={handleFilterSubmit} style={{marginBottom: "1rem", minWidth: "0"}}>Submit</MDBBtn>
                <MDBBtn onClick={handleReset} style={{backgroundColor: "#f93154", marginLeft: "1rem", marginBottom: "1rem", minWidth: "0"}}>Reset</MDBBtn>
                </form>
              </MDBRow>
            </MDBContainer>
          </div>
          {notas.length === 0 && (
            <h2>Nota Pembayaran Tidak Ditemukan</h2>
          )}
          <div className="overview-boxes">
          {notas &&
            notas.map((item) => <CardNota key={item._id} {...item} />)}
          </div>
          {location.pathname === "/all" && notas.length !== 0 && <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />}
        </div>
      </section>
    </div>
  )
}

export default Home