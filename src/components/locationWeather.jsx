import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import ErrorIcon from "@material-ui/icons/Error"
import getLocationWeather from "./getLocationWeather"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import { Button } from "@material-ui/core"

const useStyles = makeStyles({
  headerLine: {
    display: "flex",
    alignItems: "center",
  },
  location: {
    flex: 1,
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  detailLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    flex: 1,
  },
  buttonBox: {
    marginTop: "20px",
  },
})

const ErrorMessage = ({ apiError }) => {
  if (!apiError) return null

  return (
    <>
      <ErrorIcon color="error" />
      <Typography color="error" variant="h6">
        {apiError}
      </Typography>
    </>
  )
}

const WeatherDisplayDetails = ({ weatherData, location }) => {
  const classes = useStyles()
  const handleUpdate = () => getLocationWeather(location)
  const {
    country,
    temp,
    description,
    icon,
    windTransform,
    windSpeed,
    feelsLike,
  } = React.useMemo(() => {
    const [weather] = weatherData.weather || []
    return {
      country: weatherData.sys.country ? weatherData.sys.country : "",
      temp: weatherData.main.temp
        ? Math.round(weatherData.main.temp).toString()
        : "",
      feelsLike: weatherData.main.feels_like
        ? Math.round(weatherData.main.feels_like).toString()
        : null,
      description: weather ? weather.description : "",
      icon: weather
        ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
        : "",
      windTransform: weatherData.wind ? weatherData.wind.deg - 90 : null,
      windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
    }
  }, [weatherData])

  return (
    <>
      <Typography variant="h6">country: {country}</Typography>
      <Typography variant="h6">temp: {temp}&deg;C</Typography>
      <Typography variant="h6">feels like: {feelsLike}&deg;C</Typography>
      <Avatar className={classes.largeAvatar} src={icon} />{" "}
      <Typography variant="h6">{description}</Typography>
      <Typography variant="h6">wind: {`${windSpeed} km/h`}</Typography>
      <ArrowRightAltIcon
        style={{ transform: `rotateZ(${windTransform}deg)` }}
      />
      <Button
        onClick={() => handleUpdate}
        className={classes.buttonBox}
        variant="outlined"
        size="small"
        color="primary"
      >
        Update
      </Button>
    </>
  )
}

const WeatherDisplay = ({ weatherData }) => {
  const classes = useStyles()
  const { temp, icon } = React.useMemo(() => {
    const [weather] = weatherData.weather || []
    return {
      temp:
        weatherData.main && weatherData.main.temp
          ? Math.round(weatherData.main.temp)
          : "",
      icon: weather
        ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
        : "",
    }
  }, [weatherData])

  return (
    <>
      <Typography variant="h6">{temp}&deg;C</Typography>
      {icon && <Avatar className={classes.largeAvatar} src={icon} />}
    </>
  )
}

const LocationWeather = ({ location, isBtn }) => {
  const classes = useStyles()
  const [weatherData, setWeatherData] = React.useState({})
  const [apiError, setApiError] = React.useState("")
  React.useEffect(() => {
    const getWeather = async () => {
      const result = await getLocationWeather(location)
      setWeatherData(result.success ? result.data : {})
      setApiError(result.success ? "" : result.error)
    }
    getWeather()
  }, [location])

  return (
    <>
      <div className={classes.headerLine}>
        <Typography className={classes.location} variant="h5">
          {location}
        </Typography>
      </div>
      <div className={classes.detailLine}>
        <ErrorMessage apiError={apiError} />
        {isBtn ? null : <WeatherDisplay weatherData={weatherData} />}
      </div>
      <div className={classes.detail}>
        {isBtn ? (
          <WeatherDisplayDetails
            weatherData={weatherData}
            location={location}
          />
        ) : null}
      </div>
    </>
  )
}

LocationWeather.propTypes = {
  location: PropTypes.string.isRequired,
  isBtn: PropTypes.bool.isRequired,
}

export default LocationWeather
