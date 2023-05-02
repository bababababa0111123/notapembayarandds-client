import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const Navbar = () => {
  const [centredModal, setCentredModal] = useState(false);
  const {user} = useSelector((state) => ({...state.auth}));

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <div className="home-section" style={{ height: "60px", minHeight: "0"}}>
        <nav style={{justifyContent: "space-between"}}>
          <div className="searchbar">
            <div>
            <div>
            <h4 style={{marginBottom: "0px"}}>Nota Pembayaran</h4>
            </div>
            <div>
            <h5 style={{textAlign: "left"}}>{user?.result?.name}</h5>
            </div>
            </div>
          </div>
          <div style={{textDecoration: "underline", cursor:"pointer"}} onClick={toggleShow}>
              Keterangan
          </div>
        </nav>
        <div>
          <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Keterangan</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <i className="bx bx-checkbox" style={{color: "#e05260", backgroundColor: "#f7d4d7", fontSize: "2rem", borderRadius: "6px"}}/>
                    <p style={{marginLeft: "7px", marginBottom: "0"}}>Belum di-approve</p>
                  </div>
                  <div style={{display: "flex", alignItems: "center", margin: "0.7rem 0"}}>
                    <i className="bx bx-check-square" style={{color: "#ffc233", background: "#ffe8b3", fontSize: "2rem", borderRadius: "6px"}}/>
                    <p style={{marginLeft: "7px", marginBottom: "0"}}>Sudah di-approve</p>
                  </div>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <i className="bx bx-badge-check" style={{color: "#2BD47D", background: "#C0F2D8", fontSize: "2rem", borderRadius: "6px"}}/>
                    <p style={{marginLeft: "7px", marginBottom: "0"}}>Sudah dibayar</p>
                  </div>
                  <br/>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color='primary' onClick={toggleShow}>
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          </div>
    </div>
  )
}

export default Navbar