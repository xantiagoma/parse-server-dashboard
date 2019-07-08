Parse.Cloud.define('parkingsFor', async ({ params }) => {
  const { location, pagetoken } = params;
  const config = await Parse.Config.get();
  const googleMapsApiKey = config.get('GOOGLE_MAPS_KEY');
  const reqParams = {
    location,
    radius: '1500',
    type: 'parking',
    key: googleMapsApiKey,
    pagetoken
  };
  const req = await Parse.Cloud.httpRequest({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    params: reqParams
  });
  return req.data;
});

Parse.Cloud.define('populateParkingsFor', async ({ params }) => {
  var Venue = Parse.Object.extend('Venue');
  const { location } = params;
  let pagetoken = undefined;
  let total = 0;
  for (let index = 0; index < 10; index++) {
    const resp = await Parse.Cloud.run('parkingsFor', { location, pagetoken });
    pagetoken = resp.next_page_token;
    if (!pagetoken) {
      break;
    }
    for (const venueObj of resp.results) {
      const { place_id } = venueObj;
      const venue = new Venue();
      venue.set('wazePlaceId', place_id);
      try {
        await venue.save();
        total++;
      } catch (e) {}
    }
  }
  return { total };
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
  const results = await new Parse.Query('Venue')
    .equalTo('wazePlaceId', wazePlaceId)
    .find();
  if (results.length > 0) {
    throw `Place (wazePlaceId: ${wazePlaceId}) already exists`;
  }
  const config = await Parse.Config.get();
  const wazeApiKey = config.get('WAZE_KEY');
  const resp = await Parse.Cloud.httpRequest({
    url: `https://www.waze.com/maps/api/place/details/json?key=${wazeApiKey}&placeid=${wazePlaceId}`
  });
  const { formatted_address: address, geometry, url, name } = resp.data.result;
  const { location } = geometry;
  const { lat, lng } = location;
  request.object.set('address', address);
  request.object.set('url', url);
  request.object.set('name', name);
  request.object.set('location', new Parse.GeoPoint(+lat, +lng));
});
