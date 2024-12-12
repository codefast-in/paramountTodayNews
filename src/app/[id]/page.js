import NewsDetails from '@/pages/NewsDetails'
import React from 'react'

const page = ({params}) => {
    
    const {id} = params
  return (
    <NewsDetails id={id} />
  )
}

export default page
