import axios from 'axios'

export async function getCollections() {
    const { data } = await axios.get(`/api/collection/`)
    return data
}
export async function postCollection(collection) {
    const { data } = await axios.post('/api/collection', collection)
    return data
}
export async function updateCollection(collection, id) {
    const { data } = await axios.put(`/api/collection/${id}`, collection)
    return data
}
export async function deleteCollection(id) {
    const { data } = await axios.delete(`/api/collection/${id}`)
    return data
}

console.log('-------------------------')