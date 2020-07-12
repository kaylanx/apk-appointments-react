import { requestAppointment } from './appointment-request'
import { successfulResponse, validationErrorResponse } from '../../test_data/fake-appointment-request-responses'

describe('appointment request', () => {
  afterEach(() => {
    global.fetch.mockClear()
  })

  it('mail sent response', async () => {
    const response = await sendRequest(successfulResponse)
    expect(response).toEqual({ status: 'mail_sent' })
  })

  it('validation error response', async () => {
    const response = await sendRequest(validationErrorResponse)
    expect(response).toEqual({ status: 'validation_failed' })
  })

  it('generic error response', async () => {
    const response = await sendRequest(validationErrorResponse, mockFetchWithErrorResponse)
    expect(response).toEqual({ status: 'failure' })
  })

  const sendRequest = async (mockedResponse, mockFetchWithResponse = mockTheFetchWithResponse) => {
    const body = {}
    const expectedPostBody = { body: body, cache: 'no-cache', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, method: 'POST', mode: 'cors', redirect: 'follow', referrerPolicy: 'no-referrer' }

    mockFetchWithResponse(mockedResponse)
    const response = await requestAppointment({})

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/request-appointment', expectedPostBody)
    expect(response).not.toBeUndefined()
    return response
  }
})

const mockTheFetchWithResponse = (response) => {
  jest.spyOn(global, 'fetch').mockImplementation(
    () => Promise.resolve({
      json: () => Promise.resolve(response)
    })
  )
}

const mockFetchWithErrorResponse = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.reject(new Error('something bad happened'))
  )
}
