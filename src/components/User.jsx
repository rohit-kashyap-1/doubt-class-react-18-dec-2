import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const [user,setUser] = useState({})
    const params = useParams()
    const id = params.id

    useEffect(()=>{
        axios('http://localhost:3000/users/'+id).then((response)=>{
            setUser(response.data)
        })
    },[id])
  return (
    <div className='text-white'>
        <h3>User's Details {id}</h3>
        <img src={user.image} />
        <h4>Name: {user.name}</h4>
    </div>
  )
}
