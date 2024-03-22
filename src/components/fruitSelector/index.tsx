import React from 'react'
import '../sizeSelector/index.css'
import { useAppDispatch, useAppSelector } from '../../store'
import _ from 'lodash'
import Banana from '../../assets/banana.svg'
import Strawberry from '../../assets/strawberry.svg'
import Kiwi from '../../assets/kiwi.svg'
import { changeItemSelected } from '../../redux/acai/acaiSlice'

const FruitSelector = () => {

  const dispatch = useAppDispatch()

  const acaiData = useAppSelector((state) => state.acai)

  const fruitImg = (fruit: string) =>{
    switch(fruit){
      case 'Banana':
        return Banana
      case 'Morango':
        return Strawberry
      case 'Kiwi':
        return Kiwi
    }
  }

  const fruits: {fruit: string, price: number}[] = acaiData.fruits

  return(
    <div className='FruitSelectorContainer'>
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
        
        {!_.isEmpty(fruits) &&
          fruits.map((item, index) => {
            return(
              <label className='FruitOption label' key={item.fruit} htmlFor={item.fruit}>
                <div>
                  <img src={fruitImg(item.fruit)} />
                  <span>{item.fruit}</span>
                </div>
                <div>
                  <span>R${item.price}</span>
                  <input onChange={() => dispatch(changeItemSelected({item: item, type: 'fruit'}))} id={item.fruit} type='radio' name='FruitSelectorRadio' />
                </div>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default FruitSelector