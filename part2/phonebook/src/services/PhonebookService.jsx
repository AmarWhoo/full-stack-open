import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)

    // const nonExisting = {
    //     name: 'Imposter',
    //     number: '000-00000',
    //     id: 10000
    //   }

    return request.then(response => response.data)//.concat(nonExisting)
}

const add = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const chosenPersonUrl = `${baseUrl}/${id}`
    const request = axios.delete(chosenPersonUrl)
    return request.then(response => response.data)
}

export default {getAll, add, update, remove}