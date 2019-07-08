Parse.Cloud.define('hello', req => {
  return "Hello from Local's Simple Cloud Code :)";
});

Parse.Cloud.job('myJob', request => {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the ParseServer logger passed in the request
  // message: a function to update the status message of the job object
  const { params, headers, log, message } = request;
  message('I just started');
  return JSON.stringify(request, null, 2);
});

Parse.Cloud.job('updateWazeKey', async request => {
  const { log, message } = request;
  const resp = await Parse.Cloud.httpRequest({
    url: 'https://waze-key.santyxdz.now.sh/'
  });
  await Parse.Config.save({ WAZE_KEY: resp.data });
  message(`Update WAZE_KEY to ${resp.data}`);
  log(`Update WAZE_KEY to ${resp.data}`);
  return resp.data;
});

Parse.Cloud.beforeSave('Venue', async request => {
  const wazePlaceId = request.object.get('wazePlaceId');
  const config = await Parse.Config.get();
  const wazeApiKey = config.get('WAZE_KEY');
  const resp = await Parse.Cloud.httpRequest({
    url: `https://www.waze.com/maps/api/place/details/json?key=${wazeApiKey}&placeid=${wazePlaceId}`
  });
  const { formatted_address: address, geometry, url } = resp.data.result;
  const { location } = geometry;
  const { lat, lng } = location;
  request.object.set('address', address);
  request.object.set('url', url);
  request.object.set('location', new Parse.GeoPoint(+lat, +lng));
});
