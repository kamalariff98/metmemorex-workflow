import Stripe from 'stripe';
import { currentUserProfile } from './auth';
import { env } from './env';

// Check if Stripe is configured
export const stripe = env.STRIPE_SECRET_KEY 
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

const creditValue = 0.005;

export const trackCreditUsage = async ({
  action,
  cost,
}: {
  action: string;
  cost: number;
}) => {
  // Check if Stripe is configured
  if (!stripe || !env.STRIPE_CREDITS_METER_NAME) {
    console.warn('Stripe is not configured, skipping credit usage tracking');
    return;
  }

  const profile = await currentUserProfile();
  const credits = Math.ceil(cost / creditValue);

  if (!profile) {
    throw new Error('User profile not found');
  }

  if (!profile.customerId) {
    throw new Error('User customerId not found');
  }

  await stripe.billing.meterEvents.create({
    event_name: env.STRIPE_CREDITS_METER_NAME,
    payload: {
      action,
      value: credits.toString(),
      stripe_customer_id: profile.customerId,
    },
  });
};
