import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import MyCart from './MyCart'
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

function CartModal({ show, handleClose, handleShow }) {
    const { getNumberOfCartItems, getTotalCost, setLoading, items } = useContext(CartContext)

    const navigate = useNavigate()

    const handleCheckout = () => {
        let totalCost = getTotalCost().toFixed(2);
        localStorage.setItem('totalCost', totalCost);
        navigate('/payment');
    }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
   	 My Cart ({getNumberOfCartItems() === 1 ? `${getNumberOfCartItems()} item` : `${getNumberOfCartItems()} items`})
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
   	 <Modal.Header closeButton>
 		 <Modal.Title>My Cart</Modal.Title>
   	 </Modal.Header>
   	 <Modal.Body>
   		 {
     		 items.length < 1 ?
     		 <p>No items in your cart</p> :
     		 <MyCart />
   		 }
   	 </Modal.Body>

   	 <Modal.Footer className='d-flex justify-content-around'>
 		 <Button variant="primary" onClick={() => {
   		 handleClose()
   		 navigate('/')
 		 }}>
   		 Continue Shopping
 		 </Button>
 		 <Button
   		 disabled={items.length<1}
   		 variant="success"
   		 onClick={() => {
     		 handleClose()
     		 handleCheckout()
   		 }}
 		 >
   		 Checkout
 		 </Button>
   	 </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartModal