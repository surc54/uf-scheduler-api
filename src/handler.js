import axios from 'axios'
import { URL, URLSearchParams } from 'url'
import { apiResponse } from './common/api-response'

/** @type {import('aws-lambda').Handler<import('aws-lambda').APIGatewayProxyEvent>} */
export async function index (event) {
  const { semester, classNumber, courseCode } = event.queryStringParameters

  try {
    const response = await axios.get(getQueryUrl({ semester, classNumber, courseCode }).toString())
    response.status
    return apiResponse(200, response)
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
    'course-title': '',
    'cred-srch': '',
    credits: '',
    'day-f': '',
    'day-m': '',
    'day-r': '',
    'day-s': '',
    'day-t': '',
    'day-w': '',
    days: false,
    dept: '+',
    eep: '',
    fitsSchedule: false,
    ge: '',
    'ge-b': '',
    'ge-c': '',
    'ge-d': '',
    'ge-h': '',
    'ge-m': '',
    'ge-n': '',
    'ge-p': '',
    'ge-s': '',
    hons: false,
    instructor: '',
    'last-control-number': 0,
    'level-max': '--',
    'level-min': '--',
    'no-open-seats': false,
    'online-a': '',
    'online-c': '',
    'online-h': '',
    'online-p': '',
    'period-b': '',
    'period-e': '',
    'prog-level': '+',
    term: semester,
    'wr-2000': '',
    'wr-4000': '',
    'wr-6000': '',
    writing: ''
  }).toString()

  return url
}
