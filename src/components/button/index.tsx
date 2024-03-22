import React, { ReactNode } from 'react'
import './index.css'
import { useAppSelector } from '../../store'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  layout?: string
}

const Button = ({children, layout = 'primary', ...props}: IButton) =>{

  return(
    <button className={`Button ${layout}`} {...props}>
      {children}
      
    </button>
  )
}

export default Button