import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom';
import User from './components/User';
import Modal from './components/Modal'

function App() {
  const [isModal,setIsModal] = useState(false)
  const [name,setName] = useState('')
  const [image,setImage] = useState('https://picsum.photos/200')
  const [email,setEmail] = useState('')
  const [age,setAge] = useState(0)

  const [userData,setUserData] = useState({})
  const [users,setUsers] = useState([])

  const [modalData,setModalData] = useState({})

  const styles = { 
    main:{
      minHeight:'100vh',
      padding:34
    },
    form:{
      width:500
    },
    image:{
      width:90
    }
  }

  const  createUser = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/users').then(response=>response.json()).then((data)=>{
      const id = data.length+1
      axios.post('http://localhost:3000/users',{id:String(id),name,image,email,age}).then(function(response){
        console.log(response)
        setUserData({id,name,image,email,age})
      })
    })

  }

  const fetchUserData = ()=>{
    axios.get('http://localhost:3000/users').then((response)=>{
      setUsers(response.data)
    })
  }
  useEffect(()=>{
    fetchUserData()
  },[userData])
  return (
    <div className='main bg-dark' style={styles.main} data-bs-theme="dark">
      <BrowserRouter>
      <h3>Users</h3>
      <form onSubmit={createUser} style={styles.form}>
        <input type='text' className='form-control mb-3' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        <input type='text' className='form-control mb-3' placeholder='Image' value={image} onChange={(e)=>{setImage(e.target.value)}} />
        <input type='text' className='form-control mb-3' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type='text' className='form-control mb-3' placeholder='age' value={age} onChange={(e)=>{setAge(e.target.value)}} />
        <button className='btn btn-success'>Create</button>
      </form>
      <hr />
      <table className='table table-bordered table-striped table-stripped '>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th style={{ width:90 }}>Image</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>            
          </tr>
        </thead>
        <tbody>
          {(users.length)!=0?users.map((item)=>{
            return <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.image} style={styles.image} />
              </td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={(e)=>{setIsModal(true);
                  setModalData(item)

                }}>View</button>
                
              </td>
            </tr>
          }):'Loading....'}
        </tbody>
      </table>

      {isModal===true?<Modal isModal={isModal} setIsModal={setIsModal} modalData={modalData} />:''}
      
      </BrowserRouter>
    </div>
  );
}

export default App;
