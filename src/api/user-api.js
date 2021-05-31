import React from "react"
import axios from "axios"

const url = "https://jsonplaceholder.typicode.com/users"

let userApi = {
    getUsersName() {
        return axios.get(url)
            .then(res=>{
                let arr = []
                res.data.map(val=>arr.push(val.username))
                return arr
            })
    }
}


export default userApi