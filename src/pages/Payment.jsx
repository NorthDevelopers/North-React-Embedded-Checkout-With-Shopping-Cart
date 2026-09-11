import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Payment() {
  const navigate = useNavigate();
  const { items, getTotalCost } = useContext(CartContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    let redirected = false;
    let unsubscribe = null;

    const mountCheckout = async () => {
      try {
        if (typeof window.checkout === 'undefined') {
          throw new Error('Embedded Checkout script not loaded.');
        }

        // Get total amount and map products array per Integration Guide
        const amount = getTotalCost();
        const products = items.map(item => ({
          name: item.title,
          price: parseFloat(item.unitPrice),
          quantity: item.quantity,
          logoUrl: item.imageUrl
        }));

        // Fallback to local storage if items array in context is empty on page refresh
        const finalAmount = amount > 0 ? amount : (JSON.parse(localStorage.getItem('totalCost')) || 0);
        const finalProducts = products.length > 0 ? products : (JSON.parse(localStorage.getItem('myCart')) || []).map(item => ({
          name: item.title,
          price: parseFloat(item.unitPrice),
          quantity: item.quantity,
          logoUrl: item.imageUrl
        }));

        const res = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(finalAmount.toFixed(2)),
            products: finalProducts
          }),
        });

        const text = await res.text();
        let data = {};
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(text || `Server returned error status ${res.status}`);
        }

        if (!res.ok) {
          throw new Error(data.error || 'Failed to create session');
        }

        const sessionToken = data.token;
        if (!sessionToken) {
          throw new Error('No session token returned.');
        }

        // Subscribe to payment completion with proper cleanup of the returned unsubscribe function
        unsubscribe = window.checkout.onPaymentComplete((paymentData) => {
          if (redirected) return;
          redirected = true;
          sessionStorage.setItem("north_session_token", sessionToken);
          if (paymentData) {
            sessionStorage.setItem("north_client_response", JSON.stringify(paymentData));
          }
          setTimeout(() => {
            navigate('/payment/result');
          }, 2000);
        });

        await window.checkout.mount(sessionToken, 'checkout-container');

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    mountCheckout();

    // Cleanup subscription on unmount to prevent memory leaks and duplicate handlers
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate, items, getTotalCost]);

  return (
    <div className='mt-4'>
      <h3 className='text-center'>Secure Checkout</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <div id="checkout-container" style={{ minHeight: '800px', height: '1000px', margin: '0 auto' }}></div>
    </div>
  );
}

export default Payment;
