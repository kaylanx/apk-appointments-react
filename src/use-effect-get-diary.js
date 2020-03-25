import { useState, useEffect } from 'react'
import { getDiary } from './fetch-diary'

export function useEffectGetDiary () {
  const [diary, setDiary] = useState({ loading: true, data: null })

  async function fetchData () {
    const data = await getDiary()
    setDiary({ loading: false, data })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return diary
}
