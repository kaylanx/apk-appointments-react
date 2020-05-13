import { config } from '../Configuration'

async function fetchDiary (url) {
  const response = await fetch(url, {})
  const json = await response.json()
  return json
}

export const getDiary = async () => fetchDiary(config.url.APPOINTMENTS_API_URL)
