const demo = function (request, reply) {
  console.log("middleware demo");
  return reply.continue();
};

const csrf = function (request, reply) {
  console.log("CSRF!!!!!!!!!!!!!!");
  return reply.continue();
};

exports.demo= demo;
exports.csrf = csrf;
