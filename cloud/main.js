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
