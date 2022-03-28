const { spawnSync } = require("child_process");
const fs = require('fs');

const tty = fs.WriteStream('/dev/tty');

const LOG_LEVEL = process.env.LOG_LEVEL || 4;

const LOG_LEVELS = {
  FATAL: 1,
  ERROR: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6,
}

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

const log = {
  fatal: params => console.error(params),
  error: params => { if (LOG_LEVEL >= LOG_LEVELS['ERROR'] ) console.error(params) },
  warn: params => { if (LOG_LEVEL >= LOG_LEVELS['TRACE'] ) console.warn(params) },
  info: params => { if (LOG_LEVEL >= LOG_LEVELS['INFO'] ) console.log(`[INFO] ${params}`) },
  debug: params => { if (LOG_LEVEL >= LOG_LEVELS['DEBUG'] ) console.log(`[DEBUG] ${params}`) },
  trace: params => { if (LOG_LEVEL >= LOG_LEVELS['TRACE'] ) console.log(`[TRACE] ${params}`) },
}

exports.executeSyncCmd = executeSyncCmd;
exports.log = log;
