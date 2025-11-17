exports.handler = async (event) => {
  // Log for debugging
  console.log('MailerLite function called');
  console.log('Method:', event.httpMethod);
  
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { email, name, groups } = JSON.parse(event.body);
    console.log('Received data:', { email, name, groups });

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    // Check if API key exists
    if (!process.env.MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY not set in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // Security: Only allow 'general' group from public signups
    const allowedGroups = ['general'];
    const safeGroups = (groups || []).filter(g => allowedGroups.includes(g));

    // Get group ID from environment variable
    const groupId = process.env.MAILERLITE_GROUP_GENERAL;
    if (!groupId && safeGroups.length > 0) {
      console.error('MAILERLITE_GROUP_GENERAL not set in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    console.log('Calling MailerLite API...');

    // MailerLite API v2 call
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name || '',
        },
        groups: safeGroups.length > 0 && groupId ? [groupId] : [],
      }),
    });

    const data = await response.json();
    console.log('MailerLite response status:', response.status);
    console.log('MailerLite response:', data);

    if (!response.ok) {
      console.error('MailerLite API error:', data);
      
      // Handle specific error cases
      if (response.status === 401) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'API authentication failed' }),
        };
      }
      
      if (response.status === 422) {
        // Validation error - possibly already subscribed
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            error: data.message || 'Email may already be subscribed' 
          }),
        };
      }

      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || 'Failed to subscribe' }),
      };
    }

    console.log('Successfully subscribed:', email);
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      }),
    };

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};
