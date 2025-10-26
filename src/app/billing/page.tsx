// BillingPage.tsx

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import CustomerPortal from './CustomerPortal';

interface BillingPageProps {
  customerEmail: string;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

const BillingPage: React.FC<BillingPageProps> = ({ customerEmail }) => {
  return (
    <div>
      <h2>Billing Information</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm customerEmail={customerEmail} />
      </Elements>
      <CustomerPortal customerEmail={customerEmail} />
    </div>
  );
};

export default BillingPage;

// CustomerPortal.tsx

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCustomerPortal } from './CustomerPortalContext';

interface CustomerPortalProps {
  customerEmail: string;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

const CustomerPortal: React.FC<CustomerPortalProps> = ({ customerEmail }) => {
  const { customerPortalUrl } = useCustomerPortal();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubscriptionButtonClick = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement as any,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      return;
    }

    // Call your backend to create a new subscription or update the existing one
    // using the paymentMethod.id
  };

  return (
    <div>
      <h2>Customer Portal</h2>
      <p>
        <a href={customerPortalUrl} target="_blank" rel="noopener noreferrer">
          Manage your subscription and billing info
        </a>
      </p>
      <button onClick={handleSubscriptionButtonClick}>Update Payment Information</button>
    </div>
  );
};

export default CustomerPortal;