import React from "react"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
function LocationEntry({ onUpdate }) {
  const handleBlur = (e) => onUpdate(e.target.value)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpdate(e.target.value)
    }
  }

  return (
    <TextField
      autoFocus
      label="Enter location"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}
LocationEntry.propTypes = {
  onUpdate: PropTypes.func.isRequired,
}
export default LocationEntry
