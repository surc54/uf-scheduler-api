import axios from 'axios'

export async function index (event) {
  const resp = await axios.get('https://api.movies.surc.dev/').catch(err => {
    if (err.response) return err.response
    else throw err
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nodeVersion: process.version,
      apiResponse: resp.data,
      message: 'Classes will list here!',
      input: event
    })
  }
}
