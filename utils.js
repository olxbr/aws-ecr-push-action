const { spawnSync } = require("child_process");

const executeSyncCmd = (command, arrayOfParams, errorMessage) => {
  const cmd = spawnSync(command, arrayOfParams);
  if (cmd.status !== 0) {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(cmd.stderr.toString());
  }
  console.log(cmd.stdout.toString());
  return cmd.stdout.toString();
};

const sleep = (ms) =>	new Promise((resolve) => {
	setTimeout(resolve, ms);
});


exports.executeSyncCmd = executeSyncCmd;
exports.sleep = sleep;
