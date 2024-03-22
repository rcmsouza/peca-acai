import React, { useEffect } from 'react'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../store'
import _ from 'lodash'
import { changeItemSelected } from '../../redux/acai/acaiSlice'

const SizeSelector = () => {

  const dispatch = useAppDispatch()
  const { sizes, step, itemsSelected } = useAppSelector((state) => state.acai)

  useEffect(() => {
    !_.isEmpty(sizes) &&
      dispatch(changeItemSelected({item: sizes[0], type: 'size'}))
  },[sizes])

  return(
    <div className='SizeSelectorContainer'>
      <div className='SelectorHeader'>
        <div className='Title'>
          <p>Escolha o tamanho</p>
          <span>Escolha pelo menos 1 opção.</span>
        </div>
        <div className='Stage'>
          {step+1}/3
        </div>
      </div>
      <div className='OptionsContainer'>
        
        {!_.isEmpty(sizes) &&
          sizes.map((item, index) => {
            return(
              <label className='SizeOption label' htmlFor={item.size} key={item.size}>
                <span>{item.size}</span>
                <div>
                  <span>R${item.price}</span>
                  <input
                   onChange={() => dispatch(changeItemSelected({item: item, type: 'size' }))} 
                   id={item.size} 
                   type='radio' 
                   name='SizeSelectorRadio' 
                   defaultChecked={index===0}
                   className='RadioInput'
                   checked={itemsSelected.sizes.size === item.size}
                  />
                  <span className="custom-radio" />
                </div>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default SizeSelector