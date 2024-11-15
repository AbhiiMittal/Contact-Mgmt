import * as React from "react";
import { useState,useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


export default function SearchBox() {
    const [list,setList] = useState([]);
    useEffect(()=>handleGetList,[]);
    const handleGetList = async()=>{
        const res = await fetch("http://localhost:3000/api/getList");
        if(!res.ok) return alert("ERROR FETCHING DATA");
        const data = await res.json();
        setList([...data.compList, ...data.jobList]);
    }
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"0.25%"}}>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={list}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="limitTags" placeholder="JobTitle" />
        )}
        sx={{ width: "500px" }}
      />
    </div>
  );
}