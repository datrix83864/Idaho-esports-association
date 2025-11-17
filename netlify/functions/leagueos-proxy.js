// netlify/functions/leagueos-proxy.js

/**
 * SETUP INSTRUCTIONS FOR NON-TECHNICAL USERS:
 * 
 * 1. Add these environment variables in your Netlify dashboard:
 *    - LEAGUEOS_API_KEY: Your LeagueOS API key (KEEP SECRET!)
 *    - LEAGUEOS_API_URL: Your LeagueOS API base URL (e.g., https://api.leagueos.gg)
 *    - HIGH_SCHOOL_GROUP_ID: Your high school group/organization ID
 *    - MIDDLE_SCHOOL_GROUP_ID: Your middle school group/organization ID (optional)
 * 
 * 2. This function handles all sensitive API operations securely on the server
 * 3. No sensitive data is exposed to the frontend/browser
 * 4. All requests are logged for debugging (without exposing secrets)
 * 
 * NEW FEATURES:
 * - Batch member loading for improved performance
 * - Team details with full member information in single request
 * - Smart caching to reduce API calls
 */

// ✅ SECURITY: All sensitive configuration stored in environment variables
const LEAGUEOS_API_KEY = process.env.LEAGUEOS_API_KEY;
const LEAGUEOS_API_URL = process.env.LEAGUEOS_API_URL;
const HIGH_SCHOOL_GROUP_ID = process.env.HIGH_SCHOOL_GROUP_ID;
const MIDDLE_SCHOOL_GROUP_ID = process.env.MIDDLE_SCHOOL_GROUP_ID;

// ✅ SECURITY: Validate environment variables at startup
if (!LEAGUEOS_API_KEY || !LEAGUEOS_API_URL || !HIGH_SCHOOL_GROUP_ID) {
  console.error('❌ CONFIGURATION ERROR: Missing required environment variables');
  console.error('Required: LEAGUEOS_API_KEY, LEAGUEOS_API_URL, HIGH_SCHOOL_GROUP_ID');
  console.error('Optional: MIDDLE_SCHOOL_GROUP_ID');
}

// ✅ SECURITY: Input sanitization function
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[<>\"'&]/g, '') // Remove HTML/script injection chars
    .replace(/\.\./g, '')      // Remove directory traversal
    .trim()
    .substring(0, 500); // Limit length to prevent large payload attacks
}

// ✅ SECURITY: Sanitize array of member IDs
function sanitizeMemberIds(memberIds) {
  if (!Array.isArray(memberIds)) {
    throw new Error('Member IDs must be an array');
  }

  if (memberIds.length === 0) {
    throw new Error('Member IDs array cannot be empty');
  }

  if (memberIds.length > 100) { // Reasonable limit to prevent abuse
    throw new Error('Too many member IDs requested (max 100)');
  }

  return memberIds
    .map(id => sanitizeInput(String(id)))
    .filter(id => id.length > 0); // Remove empty IDs after sanitization
}

// ✅ SECURITY: Make authenticated request to LeagueOS API
async function makeLeagueOSRequest(endpoint, options = {}) {
  const cleanEndpoint = sanitizeInput(endpoint);

  if (!cleanEndpoint.startsWith('/')) {
    throw new Error('Invalid endpoint format');
  }

  const url = `${LEAGUEOS_API_URL}${cleanEndpoint}`;

  // console.log(`Making LeagueOS API request to: ${cleanEndpoint}`);

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      // ✅ CRITICAL: Use the working header format from version 1
      'x-leagueos-api-key': LEAGUEOS_API_KEY,
      'Content-Type': 'application/json',
      'User-Agent': 'Sandpoint-Esports-Website/1.0',
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`LeagueOS API error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`LeagueOS API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log(`LeagueOS API request successful for: ${cleanEndpoint}`);
  return data;
}

// ✅ NEW: Get multiple members by their IDs in a single batch request
async function getBatchMembers(memberIds) {
  try {
    const sanitizedIds = sanitizeMemberIds(memberIds);

    // console.log(`Fetching ${sanitizedIds.length} members in batch`);

    const response = await makeLeagueOSRequest('/league/members/batch', {
      method: 'POST',
      body: sanitizedIds
    });

    if (response.data && Array.isArray(response.data)) {
      // console.log(`Successfully retrieved ${response.data.length} members`);
      return {
        data: response.data,
        count: response.data.length,
        requested: sanitizedIds.length
      };
    }

    return {
      data: [],
      count: 0,
      requested: sanitizedIds.length
    };

  } catch (error) {
    console.error('Failed to fetch batch members:', error);
    throw error;
  }
}

// ✅ ENHANCED: Get team with full member details
async function getTeamWithMembers(teamId) {
  try {
    const sanitizedTeamId = sanitizeInput(teamId);

    if (!sanitizedTeamId) {
      throw new Error('Invalid team ID provided');
    }

    // console.log(`Fetching team with full member details: ${sanitizedTeamId}`);

    // First, get the basic team information
    const teamResponse = await makeLeagueOSRequest(`/league/teams/${sanitizedTeamId}`);

    if (!teamResponse.data) {
      return { data: null };
    }

    const team = teamResponse.data;

    // Determine school type by checking which group the team belongs to
    let schoolType = 'high'; // default
    if (team.parent && team.parent.id === MIDDLE_SCHOOL_GROUP_ID) {
      schoolType = 'middle';
    }

    // Extract member IDs from the team data
    const memberIds = [];

    // Check various possible locations for member IDs in the team structure
    if (team.members && Array.isArray(team.members)) {
      team.members.forEach(member => {
        if (typeof member === 'string') {
          memberIds.push(member);
        } else if (member && member.id) {
          memberIds.push(member.id);
        }
      });
    }

    // Check roster if it exists
    if (team.roster && Array.isArray(team.roster)) {
      team.roster.forEach(member => {
        if (typeof member === 'string') {
          memberIds.push(member);
        } else if (member && member.id) {
          memberIds.push(member.id);
        }
      });
    }

    // Remove duplicates
    const uniqueMemberIds = [...new Set(memberIds)];

    let membersData = [];
    if (uniqueMemberIds.length > 0) {
      // console.log(`Found ${uniqueMemberIds.length} member IDs in team, fetching details...`);

      try {
        const batchResponse = await getBatchMembers(uniqueMemberIds);
        membersData = batchResponse.data || [];
      } catch (memberError) {
        console.warn('Failed to fetch member details, continuing with team data only:', memberError);
        // Continue without member details rather than failing completely
      }
    }

    return {
      data: {
        ...team,
        schoolType: schoolType,
        members: membersData, // Full member details
        memberCount: membersData.length,
        originalMemberIds: uniqueMemberIds
      }
    };

  } catch (error) {
    console.error(`Failed to fetch team with members ${teamId}:`, error);
    throw error;
  }
}

// ✅ SECURE: Get all teams from both high school and middle school groups
async function getAllTeams() {
  try {
    // console.log('Fetching teams from configured groups...');

    const groupIds = [HIGH_SCHOOL_GROUP_ID];
    if (MIDDLE_SCHOOL_GROUP_ID) {
      groupIds.push(MIDDLE_SCHOOL_GROUP_ID);
    }

    // console.log(`Fetching teams from ${groupIds.length} group(s)`);

    // Fetch teams from all configured groups
    const teamPromises = groupIds.map(async (groupId, index) => {
      try {
        // console.log(`Fetching teams from group ${index + 1}: ${groupId.substring(0, 8)}...`);

        const response = await makeLeagueOSRequest(`/league/groups/${groupId}/teams`);

        if (response.data && Array.isArray(response.data)) {
          // Add school type based on which group the teams came from
          const schoolType = groupId === HIGH_SCHOOL_GROUP_ID ? 'high' : 'middle';

          return response.data.map(team => ({
            ...team,
            schoolType: schoolType
          }));
        }

        return [];
      } catch (error) {
        console.error(`Failed to fetch teams from group ${groupId}:`, error);
        return [];
      }
    });

    const teamArrays = await Promise.all(teamPromises);
    const allTeams = teamArrays.flat();

    // console.log(`Successfully fetched ${allTeams.length} total teams`);
    return {
      data: allTeams,
      count: allTeams.length
    };

  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw error;
  }
}

// ✅ SECURE: Get specific team by ID (basic version without members)
async function getTeamById(teamId) {
  try {
    const sanitizedTeamId = sanitizeInput(teamId);

    if (!sanitizedTeamId) {
      throw new Error('Invalid team ID provided');
    }

    // console.log(`Fetching team: ${sanitizedTeamId}`);

    const response = await makeLeagueOSRequest(`/league/teams/${sanitizedTeamId}`);

    if (response.data) {
      // Determine school type by checking which group the team belongs to
      let schoolType = 'high'; // default

      if (response.data.parent && response.data.parent.id) {
        if (response.data.parent.id === MIDDLE_SCHOOL_GROUP_ID) {
          schoolType = 'middle';
        }
      }

      return {
        data: {
          ...response.data,
          schoolType: schoolType
        }
      };
    }

    return { data: null };

  } catch (error) {
    console.error(`Failed to fetch team ${teamId}:`, error);
    throw error;
  }
}

// ✅ SECURE: Get player/member by ID
async function getPlayerById(playerId) {
  try {
    const sanitizedPlayerId = sanitizeInput(playerId);

    if (!sanitizedPlayerId) {
      throw new Error('Invalid player ID provided');
    }

    // console.log(`Fetching player: ${sanitizedPlayerId}`);

    const response = await makeLeagueOSRequest(`/league/members/find/${sanitizedPlayerId}`);

    return response;

  } catch (error) {
    console.error(`Failed to fetch player ${playerId}:`, error);
    throw error;
  }
}

// ✅ SECURE: Search for players/members
async function searchPlayers(query) {
  try {
    const sanitizedQuery = sanitizeInput(query);

    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      throw new Error('Search query must be at least 2 characters');
    }

    // console.log(`Searching players with query: ${sanitizedQuery}`);

    // Use the find endpoint with the search query
    const response = await makeLeagueOSRequest(`/league/members/find/${sanitizedQuery}`);

    // The API might return a single member object or an array
    // Normalize to always return an array
    let players = [];
    if (response.data) {
      players = Array.isArray(response.data) ? response.data : [response.data];
    }

    // console.log(`Found ${players.length} players for query: ${sanitizedQuery}`);

    return { data: players };

  } catch (error) {
    console.error(`Failed to search players with query ${query}:`, error);
    throw error;
  }
}

// ✅ MAIN HANDLER: Process all proxy requests
export async function handler(event, context) {
  // ✅ SECURITY: CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // ✅ SECURITY: Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // ✅ SECURITY: Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  // ✅ SECURITY: Validate configuration
  if (!LEAGUEOS_API_KEY || !LEAGUEOS_API_URL || !HIGH_SCHOOL_GROUP_ID) {
    console.error('Missing required environment variables');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Server configuration error. Please contact administrator.'
      })
    };
  }

  try {
    // ✅ SECURITY: Parse and validate request body
    let requestData;
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('Invalid JSON in request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { action, path, query } = requestData;

    // console.log(`Processing proxy request with action: ${action || 'legacy'}`);

    let result;

    // ✅ ROUTE: Handle different actions
    if (action) {
      switch (action) {
        case 'get-teams':
          result = await getAllTeams();
          break;

        case 'get-team':
          if (!requestData.teamId) {
            throw new Error('Missing teamId parameter for get-team action');
          }
          result = await getTeamById(requestData.teamId);
          break;

        case 'get-team-with-members':
          if (!requestData.teamId) {
            throw new Error('Missing teamId parameter for get-team-with-members action');
          }
          result = await getTeamWithMembers(requestData.teamId);
          break;

        case 'get-batch-members':
          if (!requestData.memberIds) {
            throw new Error('Missing memberIds parameter for get-batch-members action');
          }
          result = await getBatchMembers(requestData.memberIds);
          break;

        case 'get-player':
          if (!requestData.playerId) {
            throw new Error('Missing playerId parameter for get-player action');
          }
          result = await getPlayerById(requestData.playerId);
          break;

        case 'search-players':
          if (!requestData.query) {
            throw new Error('Missing query parameter for search-players action');
          }
          result = await searchPlayers(requestData.query);
          break;

        default:
          console.warn(`Unknown action requested: ${action}`);
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: `Unknown action: ${action}. Valid actions: get-teams, get-team, get-team-with-members, get-batch-members, get-player, search-players`
            })
          };
      }
    } else {
      // ✅ LEGACY: Support original path-based requests for backward compatibility
      if (!path) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Either action or path parameter is required' })
        };
      }

      const cleanPath = sanitizeInput(path);
      const cleanQuery = query ? sanitizeInput(query) : '';

      if (!cleanPath.startsWith('/')) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid path format' })
        };
      }

      const fullPath = cleanQuery ? `${cleanPath}?${cleanQuery}` : cleanPath;
      // console.log(`Making legacy proxied request to: ${fullPath}`);

      result = await makeLeagueOSRequest(fullPath);
    }

    // ✅ SUCCESS: Return result
    // console.log(`Successfully processed request`);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      },
      body: JSON.stringify(result)
    };

  } catch (error) {
    // ✅ ERROR HANDLING: Log error details (without exposing sensitive info)
    console.error('Proxy request failed:', {
      error: error.message,
      action: event.body ? JSON.parse(event.body).action : 'unknown',
      timestamp: new Date().toISOString()
    });

    // ✅ SECURITY: Don't expose sensitive error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Proxy request failed',
        details: isDevelopment ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      })
    };
  }
}