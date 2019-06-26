Parse.Cloud.define('hello', (req) => {
  return "Hello from Local's Simple Cloud Code :)";
});

Parse.Cloud.job("myJob", (request) =>  {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the ParseServer logger passed in the request
  // message: a function to update the status message of the job object
  const { params, headers, log, message } = request;
  message("I just started");
  return JSON.stringify(request, null, 2);
});