import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { TableVirtuoso } from "react-virtuoso";
import { TablePagination, TextField } from "@mui/material";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";
import SearchBox from "./SearchBox";
const columns = [
  {
    width: 60,
    label: "S.No",
    dataKey: "serialNumber",
  },
  {
    width: 100,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 100,
    label: "Last Name",
    dataKey: "lastName",
  },
  {
    width: 100,
    label: "Phone Number",
    dataKey: "phoneNumber",
  },
  {
    width: 100,
    label: "Email",
    dataKey: "email",
  },
  {
    width: 110,
    label: "Job Title",
    dataKey: "jobTitle",
  },
  {
    width: 110,
    label: "Company",
    dataKey: "company",
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function ContactTable() {
  const [selectedIds, setSelectedIds] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {column.dataKey === "serialNumber" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  {...label}
                  checked={selectedIds.includes(row._id)}
                  onChange={(e) => handleCheckbox(e, row._id)}
                />
                {_index + 1}
              </div>
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const handleCheckbox = (e, rowId) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, rowId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== rowId));
    }
  };
  const [page,setPage] = useState(0);
  const [sort,setSort] = useState([]);
  const [rowsPerPage,setRowsPerPage] = useState(10);
  const [contacts, setContacts] = useState("");
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/getContact");
    if (!res.ok) {
      alert("Error fetching contacts");
    }
    const data = await res.json();
    setContacts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{},[contacts]);

  let paginatedContact = undefined;
  if(sort.length>0){
    const filterContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(sort.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(sort.toLowerCase()) ||
        contact.phoneNumber.toString().includes(sort) ||
        contact.email.toLowerCase().includes(sort.toLowerCase()) ||
        contact.jobTitle.toLowerCase().includes(sort.toLowerCase()) ||
        contact.company.toLowerCase().includes(sort.toLowerCase())
    );
    paginatedContact = filterContacts.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage);
  }else{
  paginatedContact = contacts.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage);
  }
  return (
    <>
    {/* <SearchBox/> */}
    <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{ margin: "20px 0" }}
      />
      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={paginatedContact}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
      <TablePagination 
      component="div"
      count={contacts.length}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(e)=>setRowsPerPage(parseInt(e.target.value, 10))}
      onPageChange={(e,newPage)=>setPage(newPage)}
      />
      <div className="button">
        {selectedIds.length > 0 ? (
          <DeleteDialog selectedIds={selectedIds}/>
        ) : null}
        {
          selectedIds.length === 1 ? (
            <UpdateDialog selectedIds={selectedIds}/>
          ) : null}
      </div>
    </>
  );
}
