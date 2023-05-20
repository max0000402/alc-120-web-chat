import { UserDetail } from '../viewmodels/user'


const fetchById = (id: number): Promise<UserDetail> => fetch(`http://localhost:8080/user/${id}`)
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        throw new Error('Something went wrong')
    })

export default {
    fetchById
}