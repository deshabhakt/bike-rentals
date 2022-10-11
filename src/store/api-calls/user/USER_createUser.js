import axios from 'axios'

export const createUser = async (payload) => {
    try {
        // return await axios.post(process.env.SERVER_URL, payload)
        // const url = `${'http://localhost:5000'}/user/all`
        // console.log(url)
        // const data = await axios.get(url)
        // console.log(data)
        // return data

        const data = fetch('https://jsonplaceholder.typicode.com/todos/1')
        return data
    } catch (e) {
        return { login: 'login', password: 'password',e:'e' }
    }
}
