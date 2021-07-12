const { executeSyncCmd } = require('./utils')

const filterEmpty = x => x

console.log('Listing running containers...')
const containerIds = executeSyncCmd('docker', ['ps', '-aq']).split('\n').filter(filterEmpty)

/*
 *console.log('Listing docker images...')
 *const imageIds = executeSyncCmd('docker', ['images', '-aq']).split('\n').filter(filterEmpty)
 *
 *console.log('Listing docker volumes...')
 *const volumeIds = executeSyncCmd('docker', ['volume', 'ls', '-q']).split('\n').filter(filterEmpty)
 */

console.log('============================================')
console.log(`Running containers: ${containerIds.length}`)
/*
 *console.log(`Total images: ${imageIds.length}`)
 *console.log(`Total volumes: ${volumeIds.length}`)
 */
console.log('============================================\n')

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

 console.log('Finished docker cleanup.')
