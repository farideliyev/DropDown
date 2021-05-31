import userApi from "../api/user-api.js"

const GET_USERS = "GET_USERS"

let initialState = {
  users: [], 
  isDownloaded: false,
} 

let userReducer = (state = initialState, action)=> {
  switch (action.type) {
    case GET_USERS:
     return {
       ...state,
       users: action.payload,
       isDownloaded: true
     }
    default: 
     return state
  }
}

let getUsers = (payload)=> ({type: GET_USERS, payload})

export let getUsersThunkCreator =  () =>{
 return async (dispatch)=>{

   let response = await userApi.getUsersName()

   dispatch(getUsers(response))
 }
}

export default userReducer