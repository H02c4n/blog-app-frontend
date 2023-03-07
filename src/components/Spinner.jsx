import React from 'react'
import loading from '../assets/loading.gif';

const Spinner = () => {
  return (
    <img alt='spinner' style={{width:"50px"}} src={loading}/>
  )
}

export default Spinner