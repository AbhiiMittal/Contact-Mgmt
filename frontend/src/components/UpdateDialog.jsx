import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateDialog(props) {
    const data = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
        company: "",
      };
      const [formData, setFormData] = useState(data);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async()=>{
    const res = await fetch(`http://localhost:3000/api/updateContact/${props.selectedIds}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });
        if(!res.ok) return alert("error updating contact");
        else alert("Updated successfully");
        const data = await res.json();
        setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Update Contact
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="firstName"
            label="First Name"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            name="Last Name"
            label="Last Name"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            onChange={handleChange}
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="company"
            name="company"
            label="Company"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
