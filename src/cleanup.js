const { executeSyncCmd } = require('./utils')

const filterEmpty = x => x

// pseudo logger
function info(msg) {
  require('./logger').info(`${require('path').basename(__filename)} - ${msg}`)
}

const cleanup = () => {
  info('INFO ================ Initializing docker cleanup ================')
  info('Listing running containers...')
  const containerIds = executeSyncCmd('docker', ['ps', '-aq']).split('\n').filter(filterEmpty)

  info(`Total Running containers: ${containerIds.length}`)
  for (let id of containerIds) {
    info(`Stopping container ${id}`)
    executeSyncCmd('docker', ['stop', id])
    info(`Removing container ${id}`)
    executeSyncCmd('docker', ['rm', id])
  }

  // Just clean on Self-hosted
  if (process.env.GITHUB_RUNNER_LABELS) {
    let dockerSysCmd = "docker system prune -f"
    let dockerRmCmd  = "docker rmi $(docker images | egrep 'ecr|olxbr' | awk '{print $3}')"
    info('Found Self-hosted Runner. Clean all the mess to avoid Ephemeral Storage on k8s...')
    info('Docker System prune: ' + require('child_process').spawnSync(dockerSysCmd,{shell: true}).stdout.toString())
    info('Docker RMI: ' + require('child_process').spawnSync(dockerRmCmd,{shell: true}).stdout.toString())
  } else {
    info('No need to clean. Not Self-hosted')
  }
  info('================ Finished docker cleanup ================')
}

exports.cleanup = cleanup;
