const { executeSyncCmd } = require('./utils')

const filterEmpty = x => x

export const cleanup = () => {
  console.log('INFO ================ Initializing docker cleanup ================')
  console.log('Listing running containers...')
  const containerIds = executeSyncCmd('docker', ['ps', '-aq']).split('\n').filter(filterEmpty)

  console.log(`Total Running containers: ${containerIds.length}`)
  for (let id of containerIds) {
    console.log(`Stopping container ${id}`)
    executeSyncCmd('docker', ['stop', id])
    console.log(`Removing container ${id}`)
    executeSyncCmd('docker', ['rm', id])
  }

  // Just clean on Self-hosted
  if (process.env.GITHUB_RUNNER_LABELS) {
    let dockerSysCmd = "docker system prune -f"
    let dockerRmCmd  = "docker rmi $(docker images | egrep 'ecr|olxbr' | awk '{print $3}')"
    console.log('INFO - Found Self-hosted Runner. Clean all the mess to avoid Ephemeral Storage on k8s...')
    console.log('INFO - Docker System prune: ' + require('child_process').spawnSync(dockerSysCmd,{shell: true}).stdout.toString())
    console.log('INFO - Docker RMI: ' + require('child_process').spawnSync(dockerRmCmd,{shell: true}).stdout.toString())
  } else {
    console.log('INFO - No need to clean. Not Self-hosted')
  }
  console.log('INFO ================ Finished docker cleanup ================')
}
