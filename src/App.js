import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getUsersThunkCreator} from "./redux/userReducer";
import "./App.css"

const App = () => {
  let [text, setText] = useState("");
  let [filteredValues, setFilteredValues] = useState("");
  let [showDropDown, setShowDropDown] = useState(false);
  let  dropDown = useRef(null)
  let users = useSelector(state=>state.users)
  let dispatch = useDispatch()
  let isDownloaded= useSelector(state=>state.isDownloaded)

    //GET VALUE FROM INPUT TAG AND SAVE IT AT STATE
  let onChange = (e)=> {
      setText(e.target.value)
      setShowDropDown(true)
  }

    // GET VALUE FROM DROPDOWN LIST AND SAVE IT AT STATE
    let onClick = (name)=> {
        setText(name)
        setShowDropDown(false)
    }

    // CAPITALIZE FIRST LETTER AND LOWERCASE OTHER PART
  let capitalize = (val)=>{
      let newStr = ""
      newStr += val.charAt(0).toUpperCase() + val.substr(1).toLowerCase()
      return newStr
  }

  // CHECK IF TYPED VALUE CORRESPONDS TO USERNAMES
  let check = (arr, substring)=>{
     let filter = text && arr.filter(val=>val.includes(capitalize(substring)))
      setFilteredValues(filter)
  }

  // if text state is not empty, execute check(search) functionality
  useEffect(()=>{
      check(users, text)
  }, [text])

    // if click outside of dropdown list then hide dropdown list
    useEffect(()=>{
        const pageClick =(e)=>{
           if(!dropDown.current.contains(e.target)){
               setShowDropDown(false)
           }
        }

        if(showDropDown) {
            window.addEventListener("click", pageClick)
        }

        return ()=>{
            window.removeEventListener("click", pageClick)
        }
    }, [showDropDown])

    // load users at first render of page
  useEffect(()=>{

    dispatch(getUsersThunkCreator())
  }, [])

    return (
        <form className="form">
            <label htmlFor="user" className="label">Enter user</label>
            <div className="form__container">
                <input id="user" className="input" onChange={onChange} value={text}
                       disabled={!isDownloaded} autoComplete="off" placeholder="TYPE"/>
                <div className="form__dropDown" ref={dropDown} hidden={!showDropDown}>
                    {filteredValues &&
                    filteredValues.map((u, index) =>

                        <div onClick={() => onClick(u)} className="form__dropdown__text" key={index}>
                            {u}
                        </div>
                    )}
                </div>
            </div>


        </form>
    );
}

export default App;
