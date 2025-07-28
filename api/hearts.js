// Vercel serverless function for heart counts
// Environment variables: JSONBIN_API_KEY

const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.JSONBIN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Get or create bin ID from environment, or use a fixed one
  let binId = process.env.JSONBIN_BIN_ID;
  
  try {
    if (req.method === 'GET') {
      // Get heart counts
      const { postId } = req.query;
      
      if (!binId) {
        return res.json({ count: 0 });
      }
      
      const response = await fetch(`${JSONBIN_BASE_URL}/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': apiKey
        }
      });
      
      if (!response.ok) {
        return res.json({ count: 0 });
      }
      
      const data = await response.json();
      const count = data.record[postId] || 0;
      
      return res.json({ count });
      
    } else if (req.method === 'POST') {
      // Increment heart count
      const { postId } = req.body;
      
      if (!postId) {
        return res.status(400).json({ error: 'Post ID required' });
      }
      
      // If no bin exists, create one
      if (!binId) {
        const initialData = {};
        initialData[postId] = 1;
        
        const createResponse = await fetch(`${JSONBIN_BASE_URL}/b`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey,
            'X-Bin-Name': 'blog-hearts'
          },
          body: JSON.stringify(initialData)
        });
        
        if (createResponse.ok) {
          const createData = await createResponse.json();
          binId = createData.metadata.id;
          // Note: In production, you'd want to save this bin ID to your environment
          console.log('Created new bin:', binId);
          return res.json({ count: 1, binId });
        } else {
          return res.status(500).json({ error: 'Failed to create storage' });
        }
      }
      
      // Get current data
      const getResponse = await fetch(`${JSONBIN_BASE_URL}/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': apiKey
        }
      });
      
      let currentData = {};
      if (getResponse.ok) {
        const getData = await getResponse.json();
        currentData = getData.record;
      }
      
      // Increment count
      const currentCount = currentData[postId] || 0;
      const newCount = currentCount + 1;
      currentData[postId] = newCount;
      
      // Update bin
      const updateResponse = await fetch(`${JSONBIN_BASE_URL}/b/${binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey
        },
        body: JSON.stringify(currentData)
      });
      
      if (updateResponse.ok) {
        return res.json({ count: newCount });
      } else {
        return res.status(500).json({ error: 'Failed to update count' });
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Heart API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}