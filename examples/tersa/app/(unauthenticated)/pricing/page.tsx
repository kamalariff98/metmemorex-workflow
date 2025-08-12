import { currentUser, currentUserProfile } from '@/lib/auth';
import { env } from '@/lib/env';
import type { Metadata } from 'next';
import { Hero } from './components/hero';

export const metadata: Metadata = {
  title: 'Tersa | Pricing',
  description: 'Choose a plan to get access to all features.',
};

const PricingPage = async () => {
  const user = await currentUser();
  let currentPlan: 'hobby' | 'pro' | undefined;

  if (user) {
    try {
      const profile = await currentUserProfile();

      if (profile) {
        if (profile.productId === env.STRIPE_HOBBY_PRODUCT_ID) {
          currentPlan = 'hobby';
        } else if (profile.productId === env.STRIPE_PRO_PRODUCT_ID) {
          currentPlan = 'pro';
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Continue without profile data
    }
  }

  return <Hero currentPlan={currentPlan} authenticated={Boolean(user)} />;
};

export default PricingPage;
