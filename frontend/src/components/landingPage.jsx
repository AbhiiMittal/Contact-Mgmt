import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import './styles.css';
import ContactTable from "./ContactTable";
import ContactForm from "./ContactForm";
export default function Head() {
  const [alignment, setAlignment] = React.useState("left");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <div className="tabs">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="left">Add new Contact</ToggleButton>
          <ToggleButton value="right">All Contacts</ToggleButton>
        </ToggleButtonGroup>
        </div>
        {
            alignment === "left" ? (
            <ContactForm/>
            ) : (
                <ContactTable/>
            )
        }
    </>
  );
}
