import React from 'react'
import img1 from '../images/albums/img1.jpeg'
import img2 from '../images/albums/img2.jpeg'
import img3 from '../images/albums/img3.jpeg'
import img4 from '../images/albums/img4.jpg'
import img5 from '../images/albums/img5.jpg'
import img6 from '../images/albums/img6.jpg'
import img7 from '../images/albums/img7.webp'

const Sidediv = () => {
  return (
    <>
    <div className='side'>
        <img src={img1}  />
        <img src={img2}  />
        <img src={img3}  />
        <img src={img4}  />
        <img src={img5}  />
        <img src={img6}  />
        <img src={img7}  />
    </div>
    <div className='side'>
        <img src={img1}  />
        <img src={img2}  />
        <img src={img3}  />
        <img src={img4}  />
        <img src={img5}  />
        <img src={img6}  />
        <img src={img7}  />
    </div>
    </>
  )
}

export default Sidediv
