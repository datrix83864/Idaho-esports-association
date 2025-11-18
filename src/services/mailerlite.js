export const subscribeToNewsletter = async (email, name) => {
  console.log('🔵 Starting newsletter subscription:', { email, name });
  
  try {
    console.log('🔵 Calling function at:', '/.netlify/functions/mailerlite-subscribe');
    
    const response = await fetch('/.netlify/functions/mailerlite-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        name,
        groups: ['general']
      }),
    });

    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response ok:', response.ok);

    const data = await response.json();
    console.log('🔵 Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Subscription failed');
    }

    console.log('✅ Newsletter subscription successful');
    return data;
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};
