import { renderHook } from '@testing-library/react-hooks'
import { useEffectGetDiary } from './use-effect-get-diary'
import { getDiary } from './fetch-diary'
import fakeAppointments from './fake-appointments'
jest.mock('./fetch-diary')

describe('use the effect get appointments', () => {
  it('data is fetched and not loading', async () => {
    getDiary.mockResolvedValue(fakeAppointments)
    const { result, waitForNextUpdate } = renderHook(() =>
      useEffectGetDiary()
    )

    await waitForNextUpdate()

    expect(getDiary).toBeCalled()
    expect(result.current).toStrictEqual({
      loading: false,
      data: fakeAppointments
    })
  })
})
