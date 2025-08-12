import { getCredits } from '@/app/actions/credits/get';
import { profile } from '@/schema';
import { eq } from 'drizzle-orm';
import { database } from './database';
import { env } from './env';
import { createClient } from './supabase/server';

export const currentUser = async () => {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return user;
};

export const currentUserProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.log('No authenticated user found');
      return null;
    }

    console.log('Looking for profile for user:', user.id);
    console.log('Database connection status:', !!database);

    console.log('Executing profile query for user ID:', user.id);
    const userProfiles = await database
      .select()
      .from(profile)
      .where(eq(profile.id, user.id));
    
    console.log('Profile query result:', userProfiles);
    let userProfile = userProfiles.at(0);

    if (!userProfile && user.email) {
      console.log('Creating new profile for user:', user.id);
      const response = await database
        .insert(profile)
        .values({ id: user.id })
        .returning();

      if (!response.length) {
        throw new Error('Failed to create user profile');
      }

      userProfile = response[0];
    }

    return userProfile;
  } catch (error) {
    console.error('Error in currentUserProfile:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }
};

export const getSubscribedUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error('Create an account to use AI features.');
  }

  const profile = await currentUserProfile();

  if (!profile) {
    throw new Error('User profile not found');
  }

  if (!profile.subscriptionId) {
    throw new Error('Claim your free AI credits to use this feature.');
  }

  const credits = await getCredits();

  if ('error' in credits) {
    throw new Error(credits.error);
  }

  if (
    profile.productId === env.STRIPE_HOBBY_PRODUCT_ID &&
    credits.credits <= 0
  ) {
    throw new Error(
      'Sorry, you have no credits remaining! Please upgrade for more credits.'
    );
  }

  return user;
};
