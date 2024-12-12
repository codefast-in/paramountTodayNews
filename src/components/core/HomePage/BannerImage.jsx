import React from 'react'
import banner from "../../../assest/banner.png"

function BannerImage() {
  return (
<div className='mx-auto h-[80vh] w-screen overflow-hidden'>
    <img src={banner} alt="Banner" className='w-full h-full object-contain' />
</div>


  )
}

export default BannerImage