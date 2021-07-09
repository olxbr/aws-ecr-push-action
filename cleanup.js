const { executeSyncCmd } = require('./utils')

const containerIds = executeSyncCmd('docker', ['ps', '-aq']).trim().split('\n')
/*
 *const imageIds = executeSyncCmd('docker', ['images', '-aq']).trim().split('\n')
 *const volumeIds = executeSyncCmd('docker', ['volume', 'ls', '-q']).trim().split('\n')
 */

for (let id of containerIds) {
  console.log(`Stopping container ${id}`)
  executeSyncCmd('docker', ['stop', id])
  console.log(`Removing container ${id}`)
  executeSyncCmd('docker', ['rm', id])
}

/*
 *for (let id of imageIds) {
 *  console.log(`Removing image ${id}`)
 *  executeSyncCmd('docker', ['rmi', '-f', id])
 *}
 *
 *for (let id of volumeIds) {
 *  console.log(`Removing volume ${id}`)
 *  executeSyncCmd('docker', ['volume', 'rm', id])
 *}
 *
 */
