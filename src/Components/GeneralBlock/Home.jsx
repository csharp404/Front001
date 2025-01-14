import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Toastmsg from "./ToastMsg";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [codes, setCodes] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [refresh,setRefresh]=useState(false);
  const audio = new Audio('/sound/notification2.mp3');
  useEffect(() => {
    axios
      .get("https://localhost:7127/GetAllCodes")
      .then((res) => {
        setCodes(res.data);
      })
      .catch((err) => console.error("Error fetching codes:", err));

    axios
      .get("https://localhost:7127/GetAllEmergency")
      .then((res) => {
        setEmergencies(res.data);
        setRefresh(false)
    
      })
     
  }, [refresh]);

const HandleSolve = (id)=>{
  axios
  .delete(`https://localhost:7127/DeleteEmergency?id=${id}`)
  
  .catch((err) => console.error("Error fetching emergencies:", err));
  setRefresh(true)
}

  const handleCreateEmergency = (id) => {
   
    
    axios
    .post(`https://localhost:7127/CreateEmergency?id=${id}`)
    .then(() => {
    
        
      setRefresh(true);
      audio.play();
    
    })
    .catch((err) => console.error("Error creating emergency:", err));
    
    
    
    

  
  };

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.value);
  };

  return (
    <div className="container py-5">
    <h1 
  className="text-center mb-4 py-3 text-white rounded shadow-sm" 
  style={{ backgroundColor: "#00b1c1" }}>
  {t("Home Page")}
</h1>


      <div className="mb-3">
        <label htmlFor="codeSelect" className="form-label">
          Select a Code
        </label>
        <select
          id="codeSelect"
          className="form-select"
          value={selectedCode}
          onChange={(e) => handleCodeChange(e)}
        >
          <option value="">Select Code</option>
          {codes.map((code) => (
            <option
              key={code.id}
              value={code.id}
              style={{ backgroundColor: code.color }}
            >
              {code.code}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCreateEmergency(selectedCode)}
        disabled={!selectedCode}
      >
        {t("Create Emergency")}
      </button>

      <div className="mt-5">
        <h2>{t("Emergencies")}</h2>
        <table className="table">
          <tr style={{backgroundColor:"whitesmoke"}}>
            <th style={{ padding: "15px 20px",border: "1px solid white" }} colSpan={1}>#</th>
            <th style={{ padding: "15px 20px",border: "1px solid white" }} colSpan={3}>{t("Title")}</th>
            <th style={{ padding: "15px 20px",border: "1px solid white" }} colSpan={4}>{t("Description")}</th>
            <th style={{ padding: "15px 20px",border: "1px solid white" }} colSpan={3}>Issued by</th>
            <th style={{ padding: "15px 20px" ,border: "1px solid white"}} colSpan={1}>{t("Department")}</th>
            <th style={{ padding: "15px 20px" ,border: "1px solid white"}} colSpan={1}>{t("Solved")}</th>
          </tr>

          {emergencies.map((emergency, index) => (
            <tr
              key={index}
              
              style={{
                backgroundColor: emergency.emergencyCode.color,
                
                color: "white",
              }}
            >
              <td colSpan={1} style={{ padding: "15px 20px",border: "1px solid white" }}>{emergency.id}</td>
              <td colSpan={3} style={{ padding: "15px 20px" ,border: "1px solid white"}}> {emergency.emergencyCode.title}</td>
              <td colSpan={4} style={{ padding: "15px 20px" ,border: "1px solid white"}}>{emergency.emergencyCode.description}</td>
              <td colSpan={3} style={{ padding: "15px 20px" ,border: "1px solid white"}}>me</td>
              <td colSpan={1} style={{ padding: "15px 20px" ,border: "1px solid white"}}>dep1</td>
              <td colSpan={1} style={{ padding: "15px 20px", border: "1px solid white" }}>
  <button
    onClick={() => HandleSolve(emergency.id)}
    className="btn btn-success"
    title={t("Mark as Solved")}
  >
    {t("Solved")}
  </button>
</td>
             
              
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
