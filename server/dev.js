const { exec } = require("child_process");

console.log("Generating Swagger documentation...");

exec("node ./config/swagger.js", (error, stdout, stderr) => {
  if (error) {
    console.error(`Swagger generation error: ${error.message}`);
    return;
  }
  if (stderr) console.error(stderr);
  console.log("Swagger generated.");

  console.log("Starting server...");
  require("./server.js");
});
