import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const chosenPersonUrl = `${baseUrl}/${id}`
    const request = axios.delete(chosenPersonUrl)
    return request.then(response => response.data)
}

export default {getAll, add, remove}