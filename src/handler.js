import axios from 'axios'
import { URL, URLSearchParams } from 'url'
import { apiResponse } from './common/api-response'

/** @type {import('aws-lambda').Handler<import('aws-lambda').APIGatewayProxyEvent>} */
export async function index (event) {
  const { semester, classNumber, courseCode } = event.queryStringParameters

  try {
    const url = getQueryUrl({ semester, classNumber, courseCode }).toString()
    const response = await axios.get(url)
    console.log('Sending request to ', url)
    return apiResponse(200, response.data)
  } catch (e) {
    if (e.response) {
      // request succeeded, but returned non-200
      return apiResponse(e.response.status, { errors: [e.response.body] })
    }

    // no response (gateway error)
    return apiResponse(502, { errors: [e.message] })
  }
}

function getQueryUrl (options) {
  const { semester, classNumber = '', courseCode = '' } = options

  const url = new URL('https://one.uf.edu/apix/soc/schedule/')

  url.search = new URLSearchParams({
    category: 'CWSP',
    'class-num': classNumber,
    'course-code': courseCode,
    days: false,
    fitsSchedule: false,
    hons: false,
    'last-control-number': 0,
    'no-open-seats': false,
    term: semester,
  }).toString()

  return url
}
