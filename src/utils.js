const { spawnSync } = require("child_process");

// pseudo logger
function info(msg) {
  require('./logger').info(`${require('path').basename(__filename)} - ${msg}`)
}

const executeSyncCmd = (command, arrayOfParams, errorMessage) => {
  info(`Executing command: ${command} ${arrayOfParams.toString().replace(/,/g,' ')}`);
  const cmd = spawnSync(command, arrayOfParams);
  if (cmd.status !== 0) {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(cmd.stderr.toString());
  }
  info(`EXIT_CODE: ${cmd.status}, STDOUT: ${cmd.stdout.toString()}`);
  return cmd.stdout.toString();
};

exports.executeSyncCmd = executeSyncCmd;
