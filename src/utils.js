const { spawnSync } = require("child_process");

// pseudo logger
function info(msg) {
  require("./logger").info(`utils.js - ${msg}`);
}

const executeSyncCmd = (command, arrayOfParams, errorMessage, envVars) => {
  const envs = { env: { ...process.env, ...envVars }, shell: true };
  if (envs?.env?.DOCKER_BUILDKIT) {
    info(`DOCKER_BUILDKIT is set to ${envs.env.DOCKER_BUILDKIT}`);
  }
  info(`DOCKER_BUILDKIT is set to ${envs.env.DOCKER_BUILDKIT}`);
  info(
    `Executing command: ${command} ${arrayOfParams
      .toString()
      .replace(/,/g, " ")
      .replace(
        /[0-9a-zA-Z]{200,}(==)?/g,
        "**TOKEN**"
      )} with envs: ${JSON.stringify(envs)}`
  );
  const cmd = spawnSync(command, arrayOfParams, envs);
  if (cmd.status !== 0) {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(cmd.stderr.toString());
  }
  info(`EXIT_CODE: ${cmd.status}, STDOUT: ${cmd.stdout.toString()}`);
  return cmd.stdout.toString();
};

const sortByKey = (array, key) => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key]; // NOSONAR
    return x < y ? -1 : x > y ? 1 : 0; // NOSONAR
  });
};

exports.executeSyncCmd = executeSyncCmd;
exports.sortByKey = sortByKey;
