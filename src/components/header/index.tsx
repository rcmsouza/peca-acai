import React from 'react'
import './index.css'
import Cup from '../../assets/water_full.svg'

const Header = ({title}: {title: string}) => {
  return(
    <header className='Header'>
      <img src={Cup} alt="Copo de açaí" />
      {title}
    </header>
  )
}

export default Header