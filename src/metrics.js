const axios = require('axios');

const METRICS_SERVER_ENDPOINT = 'https://gh-hooks.olxbr.io/custom-metrics'

// pseudo logger
function info(msg) {
  require('./logger').info(`metrics.js - ${msg}`)
}

const sendMetrics = async (customMetrics = {}) => {
  try {
    const hook = {
      "workflow_job": {
        "name": process.env.GITHUB_WORKFLOW,
        "id": process.env.GITHUB_JOB,
        "run_id": process.env.GITHUB_RUN_ID,
        "head_sha": process.env.GITHUB_SHA
      },
      "repository": {
        "full_name": process.env.GITHUB_REPOSITORY
      },
      "custom_metrics": customMetrics
    }

    info('Sending custom metrics...')
    const res = await axios.post(METRICS_SERVER_ENDPOINT, hook)
    const metricsResponse = res.data
    info(JSON.stringify(metricsResponse))
  } catch(e) {
    info('Custom metrics could not be sent:')
    console.error(e)
  }
}

exports.sendMetrics = sendMetrics;
