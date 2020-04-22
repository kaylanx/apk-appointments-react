import { config } from '../Configuration'

export async function fetchDiary (url, options = {}) {
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

export const getDiary = async () => fetchDiary(config.url.API_URL)
