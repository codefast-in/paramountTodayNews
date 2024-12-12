import SingleCategory from '@/pages/SingleCategory'
import React from 'react'

const page = ({params}) => {
    
  const {id} = params
  return (
    <SingleCategory id={id}/>
  )
}

export default page
