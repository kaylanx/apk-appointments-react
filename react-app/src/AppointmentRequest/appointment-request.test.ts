import { requestAppointment } from './appointment-request'
import { successfulResponse, validationErrorResponse } from '../../test_data/fake-appointment-request-responses'

describe('appointment request', () => {
  afterEach(() => {
    (global.fetch as jest.Mock).mockClear()
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

  const sendRequest = async (mockedResponse: { into: string; status: string; message: string; invalidFields?: { into: string; message: string; idref: null }[] }, mockFetchWithResponse = mockTheFetchWithResponse) => {
    const body = new FormData()
    body.append('some key', 'some value')
    const expectedPostBody = { body: body, cache: 'no-cache', credentials: 'same-origin', method: 'POST', mode: 'cors', redirect: 'follow', referrerPolicy: 'no-referrer' }

    mockFetchWithResponse(mockedResponse)

    const map = new Map<string, string>()
    map.set('some key', 'some value')
    const response = await requestAppointment('1', map)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/request-appointment?formId=1', expectedPostBody)
    expect(response).not.toBeUndefined()
    return response
  }
})

const mockTheFetchWithResponse = (response: any): void => {

  const mockJsonPromise = Promise.resolve(response);
  const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
  });
  var globalRef:any =global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

}

const mockFetchWithErrorResponse = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.reject(new Error('something bad happened'))
  )
}
