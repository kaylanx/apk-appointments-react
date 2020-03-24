import { renderHook } from '@testing-library/react-hooks'
import { useEffectGetAppointments } from './use-effect-get-appointments'
import { getAppointments } from './fetch-appointments'
import fakeAppointments from './fake-appointments'
jest.mock('./fetch-appointments')

describe('use the effect get appointments', () => {
  it('data is fetched and not loading', async () => {
    getAppointments.mockResolvedValue(fakeAppointments)
    const { result, waitForNextUpdate } = renderHook(() =>
      useEffectGetAppointments()
    )

    await waitForNextUpdate()

    expect(getAppointments).toBeCalled()
    expect(result.current).toStrictEqual({
      loading: false,
      data: fakeAppointments
    })
  })
})
