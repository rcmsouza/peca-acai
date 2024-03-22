import React, { useEffect, useState } from 'react'
import '../sizeSelector/index.css'
import { useAppDispatch, useAppSelector } from '../../store'
import _ from 'lodash'
import Granola from '../../assets/granola.svg'
import PoweredMilk from '../../assets/powderedmilk.svg'
import Pacoca from '../../assets/pacoca.svg'
import { changeItemSelected, IComplements } from '../../redux/acai/acaiSlice'

const ComplementSelector = () => {

  const dispatch = useAppDispatch()

  const [ complementsSelected, setComplementsSelected] = useState<IComplements[]>([] as IComplements[])
  const acaiData = useAppSelector((state) => state.acai)

  const complements: {complement: string, price: number}[] = acaiData.complements

  const complementImg = (complement: string) =>{
    switch(complement){
      case 'Granola':
        return Granola
      case 'Leite Ninho':
        return PoweredMilk
      case 'Paçoca':
        return Pacoca
    }
  }

  const handleSelectComplements = (item: IComplements, event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked){
      setComplementsSelected(arr => [...arr, item])
    } else {
      setComplementsSelected(complementsSelected.filter(cs => cs.complement !== item.complement))
    }
  }

  useEffect(() => {
    dispatch(changeItemSelected({item: complementsSelected, type: 'complement'}))
  }, [complementsSelected])

  return(
    <div className='ComplementSelectorContainer'>
      <div className='SelectorHeader'>
        <div className='Title'>
          <p>Escolha o tamanho</p>
          <span>Escolha pelo menos 1 opção.</span>
        </div>
        <div className='Stage'>
          {acaiData.step+1}/3
        </div>
      </div>
      <div className='OptionsContainer'>
        {!_.isEmpty(complements) &&
          complements.map((item, index) => {
            return(
              <label className='ComplementOption label' key={item.complement}  htmlFor={item.complement}>
                <div>
                  <img src={complementImg(item.complement)} />
                  <span>{item.complement}</span>
                </div>
                <div>
                  <span>R${item.price}</span>
                  <input
                  id={item.complement} 
                  onChange={(event) => handleSelectComplements(item, event)} 
                  type='checkbox' 
                  name='FruitSelectorRadio'
                  checked={!!acaiData.itemsSelected.complements.find(complement => complement.complement === item.complement)}
                  />
                  <span className={`custom-checkbox ${!!acaiData.itemsSelected.complements.find(complement => complement.complement === item.complement) ? 'checked' : ''}`} />
                </div>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default ComplementSelector