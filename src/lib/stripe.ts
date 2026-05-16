import Stripe from 'stripe';

/**
 * Initializes the Stripe client for backend usage.
 * Required for Payment Intents, Webhooks, and Connect Payouts.
 */
export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
  }

  return new Stripe(secretKey, {
    apiVersion: '2025-02-24.acacia', // Best practice: pin API version
    appInfo: {
      name: 'Faith in Tewahido LMS',
      version: '1.0.0',
    },
  });
}

/**
 * Calculates the revenue split for a given payment amount and generates 
 * the necessary Stripe parameters to route funds to the Instructor's Connect account.
 * 
 * Logic:
 * - 70% to Instructor
 * - 20% to School (Account / Tenant)
 * - 10% to Platform (Faith in Tewahido)
 */
export function calculateRevenueSplit(
  totalAmountUsd: number, 
  instructorStripeAccountId: string
) {
  const amountCents = Math.round(totalAmountUsd * 100);
  
  // 70% payout
  const instructorPayoutCents = Math.round(amountCents * 0.70);
  
  // Implicit 30% left behind for Platform + School Admin.
  // In a real multi-party split, we would use separate transfers or Destination Charges.
  
  return {
    transfer_data: {
      destination: instructorStripeAccountId,
      amount: instructorPayoutCents,
    },
  };
}
