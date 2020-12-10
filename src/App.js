import React from "react"
import Header from "./components/Header"
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import WeatherCard from "./components/WeatherCard"
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  containerGrid: {
    flex: 1,
    overflowY: "auto",
    padding: "2em",
  },
  addButton: {
    position: "absolute",
    margin: "1em",
    bottom: "92.5%",
    left: "20%",
  },
}))
const LOCAL_STORAGE_KEY = "locations"
const saveToLocalStorage = (locations) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations))
}
const readFromLocalStorage = () => {
  const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storedLocations ? JSON.parse(storedLocations) : []
}

const App = () => {
  const classes = useStyles()
  const [weatherLocations, setWeatherLocations] = React.useState(
    readFromLocalStorage()
  )

  const handleAddClick = () => setWeatherLocations([...weatherLocations, ""])

  const updateLocations = (locations) => {
    setWeatherLocations(locations)
    saveToLocalStorage(locations)
  }

  const removeAtIndex = (index) => () =>
    updateLocations(
      weatherLocations.filter((_, locationIndex) => locationIndex !== index)
    )

  const updateAtIndex = (index) => (updatedLocation) =>
    updateLocations(
      weatherLocations.map((location, locationIndex) =>
        locationIndex === index ? updatedLocation : location
      )
    )
  return (
    <div>
      <Header />
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.containerGrid}>
          {weatherLocations.map((location, index) => (
            <Grid key={location} xs={12} sm={6} md={4} lg={3} item>
              <WeatherCard
                location={location}
                onDelete={removeAtIndex(index)}
                onUpdate={updateAtIndex(index)}
              />
            </Grid>
          ))}
        </Grid>             
      </div>
      <Fab
        onClick={handleAddClick}
        aria-label="add weather location"
        className={classes.addButton}
        color="secondary"
      >
        <AddIcon />
      </Fab>
    </div>
  )
}
export default App
