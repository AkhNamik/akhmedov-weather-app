const API_KEY = "d42e812868b3c1c3fc4b6bd6bb86b9db"
export default async (location) => {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    )
    if (result.status === 200) {
      return { success: true, data: await result.json() }
    }

    return { success: false, error: result.statusText }
  } catch (ex) {
    return { success: false, error: ex.message }
  }
}
