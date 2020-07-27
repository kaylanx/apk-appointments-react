/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '../Configuration'

async function fetchDiary (url: RequestInfo): Promise<any> {
  const response = await fetch(url, {})
  const json = await response.json()
  return json
}

export const getDiary = async (): Promise<any> => fetchDiary(config.url.APPOINTMENTS_API_URL || '')
