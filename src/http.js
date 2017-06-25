import movieJson from './mocks/movie.json'
import hallJson from './mocks/hall.json'

const jsonData = {
    '/movie': movieJson,
    '/hall': hallJson,
}

export function httpRequest(url) {
    const fetcher = (resolve, reject) => {
        if (jsonData[url]) {
            resolve(jsonData[url])
            return
        } else {
            reject({ errorMessage: '', statusCode: 400 })
        }
    }

    return new Promise(fetcher)
}
