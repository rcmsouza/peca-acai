import React, { useEffect } from 'react'
import './index.css'
import Star from '../../assets/star.svg';
import Acai from '../../assets/acai.png'
import Button from '../../components/button';
import SizeSelector from '../../components/sizeSelector';
import { addAcaiData, decreaseQuantity, fetchAcaiData, increaseQuantity, nextStep } from '../../redux/acai/acaiSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import _ from 'lodash';
import FruitSelector from '../../components/fruitSelector';
import ComplementSelector from '../../components/complementSelector';
import { useNavigate } from 'react-router-dom';

const Selector = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const data = useAppSelector(state => state.acai)

  let complementsPrice: number = data.itemsSelected.complements.reduce((sum, num) => sum + num.price, 0);

  const getAcaiData = async () => {
    try{
      const payload = await dispatch(fetchAcaiData())

      dispatch(addAcaiData(payload.payload[0]))
    } catch(e){

      console.log(e)

    }

  }

  const whichStep = () =>{
    switch(data.step){
      case 0:
        return <SizeSelector />
      case 1:
        return <FruitSelector />
      case 2:
        return <ComplementSelector />
        
    }
  }
  
  useEffect(() => {

    getAcaiData()

  }, [])

  return(
    <div className='Container'>
      <div className='AcaiContainer'>
        <div className='ImgContainer'>
          <img className='AcaiImg' src={Acai} alt='Açaí com frutas' />
        </div>
        <div className='InfoContainer'>
          <h1>Açaí Natural</h1>
          <div className='Rating'>
            <img src={Star} alt='Estrela' />
            <strong>4.5</strong>
            <span>(30+)</span>
            <a href='#'>Ver Avaliações</a>
          </div>
          <div className='Description'>
            Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente açaí puro! Ideal para quem gosta de aproveitar um 
            açaí puro ou rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse copo!
          </div>
          {!_.isEmpty(data)&&
            <div className='Selector'>
              {whichStep()}
            </div>
          }
        </div>
      </div>
      <div className='ButtonContainer'>
        <div className='IncreaseDecreaseButton'>
          <div className="value-button" id="decrease" onClick={() => dispatch(decreaseQuantity())}>-</div>
            <input min="1" disabled type="number" id="number" value={data.itemsSelected.quantity} />
          <div className="value-button" id="increase" onClick={() => dispatch(increaseQuantity())} >+</div>
        </div>
        <Button onClick={() => data.step === 2 ? navigate('/checkout') : dispatch(nextStep())}>
          <span>AVANÇAR</span> 
          <span>R${data.itemsSelected.quantity * (data.itemsSelected?.sizes?.price + (data.itemsSelected?.fruits?.price || 0) +( complementsPrice || 0))}</span>
        </Button>
      </div>
    </div>
  )
}

export default Selector