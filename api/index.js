addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  if (event.request.method === "OPTIONS") {    
    return handleOptions(event.request)
  } 


  let accountId = CVIDEO_ACC_ID; //get from secret
  let token = CVIDEO_API_TOKEN; //secret
  
  let url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`;
  let body = {
    "maxDurationSeconds": 30,
    "requireSignedURLs": true,
    "allowedOrigins": ["cvideo.rocks"],
  };
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  let json = await res.json();
  console.log(json);
  return new Response(JSON.stringify(json.result, null, 2), 
    {
      headers: { 'content-type': 'application/json' },
    }
  )
}

function handleOptions(request) {
  const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, PATCH, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
  }      
  if (request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null) {
    // Handle CORS pre-flight request.
    return new Response(null, { headers: corsHeaders });
  }
  // Handle standard OPTIONS request.
  return new Response(null, {
      headers: { "Allow": "GET, HEAD, PATCH, POST, OPTIONS" } 
  });
}