import React from 'react'
import styles from './Modal.module.css'

export default function Modal({isModal,setIsModal,modalData}) {
  return (
    <div className={`${styles.modal}`} onClick={()=>{setIsModal(false)}}>
      <div className={`${styles.modalContent}`} onClick={(e)=>{e.stopPropagation()}}>
        <button onClick={()=>{setIsModal(false)}}>Close Modal</button>
        <h1>{modalData.name}</h1>
        <h4>{modalData.email}</h4>
        <img src={modalData.image} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laboriosam distinctio repudiandae, omnis possimus asperiores, rerum iste maxime, et reiciendis molestiae corrupti dicta libero? Veniam consectetur commodi accusantium quasi quia?</p>
      </div>
    </div>
  )
}
