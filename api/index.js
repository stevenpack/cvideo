addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  if (request.method === "OPTIONS") {    
    return handleOptions(request)
  } 


  let accountId = CVIDEO_ACC_ID; //get from secret
  let token = CVIDEO_API_TOKEN; //secret
  
  let url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`;
  let body = {
    "maxDurationSeconds": 30,
    "requireSignedURLs": false,
    //"allowedOrigins": ["cvideo.rocks"],
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
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}