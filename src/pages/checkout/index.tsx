import React from 'react'
import './index.css'
import Header from '../../components/header'
import Acai from '../../assets/acai.png'
import { useAppSelector } from '../../store'
import _ from 'lodash'
import Button from '../../components/button'

const Checkout = () => {

  const { itemsSelected } = useAppSelector(state => state.acai)

  let date = new Date()

  date.setMinutes(date.getMinutes() + Number(itemsSelected.quantity + itemsSelected.sizes.time))

  console.log()

  return(
    <div className='App'>
      <Header title={'peça açaí'}/>
      <div className='CheckoutContainer'>
        <p className='Order'>Meus Pedidos</p>
        <div>
          <p className='ActiveOrders'>Pedidos Ativos</p>
          <div className='ActiveOrdersContainer'>
            <div className='ActiveOrdersInfos'>
              <div className='ImgContainer'>
                <img className='AcaiImg' src={Acai} alt='Açaí com frutas' />
              </div>
              <div className='OrderInfoContainer'>
                <p className='Infos'>{itemsSelected.quantity}{itemsSelected.quantity > 1 ? ' Itens' : ' Item'} </p>
                <p className='Acai'>Açaí Natural</p>
                <p className='Infos'>- {itemsSelected.sizes.size}</p>
                {!!itemsSelected.fruits.fruit && 
                  <p className='Infos'>- {itemsSelected.fruits.fruit}</p>
                }
                {!_.isEmpty(itemsSelected.complements) &&
                  <p className='Infos'>- {itemsSelected.complements.map(item => `${item.complement}; `)}</p>
                }
              </div>
              <div>
                <p className='OrderNumber'>#0010966456</p>
              </div>
            </div>
            <hr style={{width: '100%'}}/>
            <div className='DeliveryInfo'>
              <div>
                <span>Previsão de entrega</span>
                <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div>
                <span>Valor total</span>
                <span>R$30,00</span>
              </div>
            </div>
            <div className='ButtonContainer'>
              <Button layout='secondary'>AJUDA</Button>
              <Button>RASTREAR PEDIDO</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout