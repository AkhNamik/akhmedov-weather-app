import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import LocationEntry from "../locationEntry"
import LocationWeather from "../locationWeather"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    outline: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#3f51b5",
    fontSize: "0.8125rem",
  },
  content: { flex: 1 },
}))

const WeatherCard = ({ location, onDelete, onUpdate }) => {
  const classes = useStyles()
  const [isBtn, setIsBtn] = React.useState(false)
  const handleChange = () => {
    return setIsBtn(!isBtn)
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        {!location && <LocationEntry onUpdate={onUpdate} />}
        {location && <LocationWeather location={location} isBtn={isBtn} />}
      </CardContent>
      <CardActions className={classes.buttonBox}>
        <Button onClick={onDelete} size="small" color="primary">
          Remove
        </Button>
        {isBtn ? (
          <Button onClick={handleChange} size="small" color="primary">
            BACK
          </Button>
        ) : (
          <Button
            onClick={handleChange}
            variant="outlined"
            size="small"
            color="primary"
          >
            MORE DETAILS
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

WeatherCard.propTypes = {
  location: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default WeatherCard
