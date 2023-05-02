import React, {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNota, deleteNota, updateNota, getNota } from '../redux/features/notaSlice';
import { MDBBtn, MDBValidation } from 'mdb-react-ui-kit';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Spinner from "../components/Spinner";
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

const initialState = {
    kepada: "",
    namaBank: "",
    cabang: "",
    noRek: "",
    atasNama: "",
    nominal: 0,
    untuk: "",
    namaFile: "",
    noInvoice: "",
    kategoriBiaya: ""
}

const AddEditNota = () => {
    const [notaData, setNotaData] = useState(initialState);
    const [edit, setEdit] = useState(false)
    const { error, notas, nota, loading } = useSelector((state) => ({...state.nota,}));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { kepada, caraBayar, namaBank, cabang, noRek, atasNama, nominal, untuk, namaFile, status, noInvoice, kategoriBiaya } = notaData;
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setNotaData(initialState)
            setEdit(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!id])

    useEffect(() => {
        if (id) {
          dispatch(getNota(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id]);

    useEffect(() => {
      if (id && edit) {
        const singleNota = notas.find((nota) => nota._id === id);
        setNotaData({ ...singleNota });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id && edit]);
    
    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    var someDate = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (kepada && namaBank && noRek && nominal && untuk && kategoriBiaya) {
            const updatedNotaData = { ...notaData, dibuatOleh: user?.result?.name };
            dispatch(createNota({ updatedNotaData, navigate, toast }));
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();
        if (kepada && namaBank && noRek && nominal && untuk && kategoriBiaya) {
            const updatedNotaData = { ...notaData };
            dispatch(updateNota({ id, updatedNotaData, toast, navigate }));
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setNotaData({ ...notaData, [name]: value });
    };

    // const onCheckChange = () => {
    //     if (window.confirm("Apakah Anda yakin untuk memberikan approve pada nota ini?")){
    //         setNotaData({ ...notaData, status: "alreadyChecked", diapproveOleh: user?.result?.name });
    //     }
    // }

    const onPayChange = () => {
        if (window.confirm("Apakah Anda yakin telah membayar nota ini?")){
            setNotaData({ ...notaData, status: "payed", dibayarOleh: user?.result?.name });
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus nota ini?")) {
            dispatch(deleteNota({ id, toast, navigate }));
        }
    };

    if (loading) {
        return <Spinner />
    }

    function pembilang(nilai){
        nilai = Math.abs(nilai);
        var simpanNilaiBagi=0;
        var huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
        var temp="";
     
        if (nilai < 12) {
            temp = " "+huruf[nilai];
        }
        else if (nilai <20) {
            temp = pembilang(nilai - 10) + " Belas";
        }
        else if (nilai < 100) {
            simpanNilaiBagi = Math.floor(nilai/10);
            temp = pembilang(simpanNilaiBagi)+" Puluh"+ pembilang(nilai % 10);
        }
        else if (nilai < 200) {
            temp = " Seratus" + pembilang(nilai - 100);
        }
        else if (nilai < 1000) {
            simpanNilaiBagi = Math.floor(nilai/100);
            temp = pembilang(simpanNilaiBagi) + " Ratus" + pembilang(nilai % 100);
        }
         else if (nilai < 2000) {
            temp = " Seribu" + pembilang(nilai - 1000);
        }
        else if (nilai < 1000000) {
            simpanNilaiBagi = Math.floor(nilai/1000);
            temp = pembilang(simpanNilaiBagi) + " Ribu" + pembilang(nilai % 1000);
        } 
        else if (nilai < 1000000000) {
            simpanNilaiBagi = Math.floor(nilai/1000000);
            temp =pembilang(simpanNilaiBagi) + " Juta" + pembilang(nilai % 1000000);
        } 
        else if (nilai < 1000000000000) {
            simpanNilaiBagi = Math.floor(nilai/1000000000);
            temp = pembilang(simpanNilaiBagi) + " Miliar" + pembilang(nilai % 1000000000);
        } 
        else if (nilai < 1000000000000000) {
            simpanNilaiBagi = Math.floor(nilai/1000000000000);
            temp = pembilang(nilai/1000000000000) + " Triliun" + pembilang(nilai % 1000000000000);
        }
     
        return temp;
    }

    return (
<div>
<Sidebar></Sidebar>
<Navbar></Navbar>
    <div className='home-section'>
        <div className='home-content main themain' style={{ paddingBottom: "50px", paddingTop: "45px", textAlign: "left" }}>
            <div style={{ width: "55vw"}}>
                <MDBValidation noValidate className='notapembform'>
                    <div style={{
                        paddingBottom: "20px", 
                        display: (!id ? "none" : status === "payed" || nota.status === "payed" ? "none" : nota.status === "alreadyChecked" && user?.result?.role !== "payer" ? "none" : status === "alreadyChecked" && user?.result?.role !== "payer" ? "none" : "flex"), 
                        justifyContent: "space-between", 
                        width: "50vw", 
                        minWidth: "250px"
                    }}>
                        <label>Update</label>
                        <input style={{display: "inline-block", width: "max-content", minWidth: "0"}} 
                        type="checkbox" 
                        onClick={() => setEdit(!edit)}
                        />
                    </div>
                    <div style={{paddingBottom: "20px", display: (id ? "none" : "block")}}>
                        <label>Dibuat Pada:</label><br/>
                        <input 
                        type="date" 
                        name="createdAt" 
                        defaultValue={someDate}
                        onChange={onInputChange} 
                        required
                        />
                    </div>
                    <div style={{paddingBottom: "20px"}}>
                        <label>Dibayarkan Kepada:</label><br/>
                        <input 
                        type="text" 
                        value={id && edit ? kepada : nota.kepada}
                        name="kepada"
                        maxLength="30" 
                        onChange={onInputChange} 
                        required
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>Cara Pembayaran:</label><br/>
                        <select
                        name="caraBayar"
                        id='caraBayar'
                        maxLength="30" 
                        onChange={onInputChange} 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        defaultValue = {id ? caraBayar || nota.caraBayar : ""}
                        >
                            <option value="Transfer">Transfer</option> 
                            <option value="Tunai">Tunai</option>
                            <option value="Cek">Cek</option>
                        </select>
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>Nama Bank:</label><br/>
                        <input 
                        type="text" 
                        value={id && edit ? namaBank : nota.namaBank}
                        name="namaBank" 
                        onChange={onInputChange} 
                        required 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>Cabang:</label><br/>
                        <input 
                        type="text" 
                        value={id && edit ? cabang : nota.cabang}
                        name="cabang" 
                        onChange={onInputChange} 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>No Rekening:</label><br/>
                        <input 
                        type="text"
                        value={id && edit ? noRek : nota.noRek}
                        name="noRek" 
                        onChange={onInputChange} 
                        required 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>Atas Nama:</label><br/>
                        <input 
                        type="text" 
                        value={id && edit ? atasNama : nota.atasNama}
                        name="atasNama" 
                        onChange={onInputChange} 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>
                    
                    <div style={{paddingBottom: "20px"}}>
                    <label>Nominal:</label><br/>
                        <CurrencyFormat 
                        thousandSeparator={'.'} 
                        decimalSeparator={','} 
                        prefix={'Rp'} 
                        value={id && edit ? nominal : nota.nominal}
                        name="nominal"
                        onChange={onInputChange}
                        required 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}>
                    </CurrencyFormat>
                    </div>


                    <div style={{paddingBottom: "20px"}}>
                        <label>Untuk Pembayaran:</label><br/>
                        <input 
                        type="text" 
                        value={id && edit ? untuk : nota.untuk}
                        name="untuk"
                        onChange={onInputChange} 
                        required 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        />
                    </div>
                    
                    <div style={{paddingBottom: "20px"}}>
                        <label>Kategori Biaya:</label><br/>
                        <select
                        name="kategoriBiaya"
                        id='kategoriBiaya'
                        maxLength="35" 
                        onChange={onInputChange} 
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        defaultValue = {id ? kategoriBiaya || nota.kategoriBiaya : ""}
                        >
                            <option dafault value="Pilih Kategori Biaya">Pilih Kategori Biaya</option>
                            <option value="Pembelian Barang">Pembelian Barang</option>
                            <option value="Biaya Tenaga Kerja">Biaya Tenaga Kerja</option>
                            <option value="Biaya Telepon Operator">Biaya Telepon Operator</option>
                            <option value="Biaya Sparepart Mesin Operator">Biaya Sparepart Mesin Operator</option>
                            <option value="Biaya Service Kendaraan Bermotor">Biaya Service Kendaraan Bermotor</option>
                            <option value="Sewa Kantor & Service Charge">Sewa Kantor & Service Charge</option>
                            <option value="Biaya Transport & BBM">Biaya Transport & BBM</option>
                            <option value="Biaya Kebersihan & Utility Kantor">Biaya Kebersihan & Utility Kantor</option>
                            <option value="Biaya Perlengkapan Untuk Training">Biaya Perlengkapan Untuk Training</option>
                            <option value="Biaya ATK & Keperluan Kantor">Biaya ATK & Keperluan Kantor</option>
                            <option value="Biaya Listrik & Telepon Kantor">Biaya Listrik & Telepon Kantor</option>
                            <option value="Biaya Promosi">Biaya Promosi</option>
                            <option value="Pajak Bulanan">Pajak Bulanan</option>
                            <option value="Pajak Tahunan">Pajak Tahunan</option>
                            <option value="Keperluan dan Perbaikan Kantor">Keperluan dan Perbaikan Kantor</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>No Nota:</label><br/>
                        <input 
                        type="text" 
                        value= {id && edit ? noInvoice : nota.noInvoice}
                        name="noInvoice"
                        onChange={onInputChange}
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        ></input>
                    </div>

                    <div style={{paddingBottom: "20px"}}>
                        <label>Nama File:</label><br/>
                        <input 
                        type="text" 
                        value= {id && edit ? namaFile : nota.namaFile}
                        defaultValue= {moment().format(`YYYYMMDD[_]`)}
                        name="namaFile"
                        onChange={onInputChange}
                        disabled = {edit === false ? "disabled" : user?.result?.role === "payer" ? "disabled" : ""}
                        ></input>
                    </div>

                    <div style={{paddingBottom: "20px", display: (id ? "flex" : "none"), justifyContent: "space-between", width: "50vw", minWidth: "250px"}}>
                        <label>Apakah nota ini setuju untuk di-approve?</label>
                        <input style={{display: "inline-block", width: "max-content", minWidth: "0"}} 
                        type="checkbox" 
                        // value="checked"
                        // name="status"
                        onClick={() => setNotaData({ ...notaData, status: "alreadyChecked", diapproveOleh: user?.result?.name })}
                        disabled = {edit === true && user?.result?.role === "checker" ? "" : "disabled"}
                        defaultChecked = {status === "alreadyChecked" || status === "payed" || nota.status === "alreadyChecked" || nota.status === "payed" ? "true" : ""}
                        />
                    </div>
                    
                    <div style={{paddingBottom: "20px", display: (id ? "flex" : "none"), justifyContent: "space-between", width: "50vw", minWidth: "250px"}}>
                        <label>Apakah nota ini sudah dibayar?</label>
                        <input style={{display: "inline-block", width: "max-content", minWidth: "0"}} 
                        type="checkbox" 
                        // value="payed"
                        // name="status"
                        onClick={onPayChange}
                        disabled = {user?.result?.role === "payer" && edit === true && status === "alreadyChecked" ? "" : "disabled"}
                        defaultChecked = {status === "payed" || nota.status === "payed" ? "true" : ""}
                        />
                    </div>

                    <div style={{ display: edit ? "block" : "none" }}>
                        <MDBBtn style={{ width: "22vw", display: "inline-block", marginRight: "2vw"}} onClick={id ? handleEdit : handleSubmit}>
                            {!id ? "Submit" : "Update" }
                        </MDBBtn>
                        <MDBBtn
                            style={{ width: "22vw", display: !id ? "none" : user?.result?.role === "payer" ? "none" : "inline-block" }}
                            color="danger"
                            onClick={() => handleDelete(id)}
                            >
                            Delete
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </div>

            {id && !edit ? (
            <div>
            <h4 style={{fontWeight: "500", marginTop: "40px"}}>Display:</h4>
                    <div className="displaynota" style={{marginTop: "20px"}}>
                      <h2 className="textnota">Nota Pembayaran</h2>
                      <div className="tablenota" style={{paddingBottom: "10px"}}>
                        <div style={{padding: "10px", border: "black solid 1px"}}>
                      <table className="table1">
                        <tbody style={{padding: "10px"}}>
                        <tr>
                          <td colSpan="5"></td>
                          <td className="padding">Tanggal</td>
                          <td>:</td>
                          <td className="date underline">{moment(nota.createdAt).format('DD MMM YYYY')}</td>
                        </tr>
                        <tr>
                          <td style={{minWidth: "180px"}}>Dibayarkan Kepada</td>
                          <td>:</td>
                          <td colSpan="3" className="underline DibayarkanKepadaTable">{nota.kepada}</td>
                          <td className="padding">No. Nota</td>
                          <td>:</td>
                          <td className="underline notanumb">{nota.noInvoice}</td>
                        </tr>
                        <tr>
                          <td colSpan="2"><i className={nota.caraBayar === "Tunai" ? "bx bx-checkbox-checked" : "bx bx-checkbox"} ></i>Tunai <i className={nota.caraBayar === "Cek" ? "bx bx-checkbox-checked" : "bx bx-checkbox"} ></i>Cek <i className={nota.caraBayar !== "Cek" && nota.caraBayar !== "Tunai" ? "bx bx-checkbox-checked" : "bx bx-checkbox"} ></i>Transfer</td>
                          <td className="padding">Nama Bank</td>
                          <td>:</td>
                          <td className="underline NamaBankTable">{nota.namaBank}</td>
                          <td className="padding">Cabang</td>
                          <td>:</td>
                          <td className="underline CabangTable">{nota.cabang}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" style={{border: "black solid 1px", textAlign: "center"}}>{nota.nominal}</td>
                          <td className="padding" style={{minWidth: "155px"}}>No. Rekening</td>
                          <td>:</td>
                          <td className="underline NoRekTable">{nota.noRek}</td>
                          <td className="padding" style={{minWidth: "135.5px"}}>Atas Nama</td>
                          <td>:</td>
                          <td className="underline ANTable">{nota.atasNama}</td>
                        </tr>
                        <tr>
                          <td>Terbilang</td>
                          <td>:</td>
                          <td colSpan="6" className="underline terbilangnya">{pembilang(nota.hasilNominal)} Rupiah</td>
                        </tr>
                        <tr>
                          <td>Untuk Pembayaran</td>
                          <td>:</td>
                          <td colSpan="6" className="underline UntukPembTable" style={{wordWrap: "break-word"}}>{nota.untuk}</td>
                        </tr>
                        </tbody>
                      </table>
                      </div>
                      <div style={{padding: "0px 10px 3px 10px", marginTop: "10px", border: "black solid 1px"}}>
                      <table className="table2" style={{border: "none"}}>
                        <tbody>
                        <tr>
                          <td style={{paddingTop: "0px"}}>DIBUAT</td>
                          <td style={{paddingTop: "0px"}}>DISETUJUI</td>
                          <td style={{paddingTop: "0px"}}>DIBAYAR</td>
                        </tr>
                        <tr>
                          <td className="padtop" style={{textDecoration: "underline", textAlign: "center"}}>{nota.dibuatOleh}</td>
                          <td className="padtop" style={{textDecoration: "underline", textAlign: "center"}}>{nota.diapproveOleh || ""}</td>
                          <td className="padtop" style={{textDecoration: "underline", textAlign: "center"}}>{nota.dibayarOleh || ""}</td>
                        </tr>
                        </tbody>
                      </table>
                      </div>
                    </div>
                    <p style={{fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "400", fontSize: "16px"}}>Nama File: <span className="insertnamafile NamaFileTable" style={{fontWeight: "300", marginLeft: "3px"}}>{nota.namaFile}</span></p>
                    </div>
            </div>) : ""}
        </div>
    </div>
</div>
    )
}

export default AddEditNota