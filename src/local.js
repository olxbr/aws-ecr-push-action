const fs = require('fs')
const core = require('@actions/core')
const yaml = require('js-yaml')

const isLocal = !!process.env['isLocal']

const actionFilePath = './action.yml'

// pseudo logger
function info(msg) {
  require('./logger').info(`${require('path').basename(__filename)} - ${msg}`)
}

const readActionFile = () => {
  try {
    return actionData = yaml.load(fs.readFileSync(actionFilePath, 'utf8'))
  } catch(e) {
    throw e
  }
}

class CoreMock {
  static STATE = {}
  static ACTION = null
  static OUTPUTS = {}

  constructor() {
    CoreMock.ACTION = readActionFile()
  }

  saveState(key, value) {
    CoreMock.STATE[key] = value
  }

  getState() {
    return CoreMock.STATE
  }

  getInput(key) {
    const input = CoreMock.ACTION.inputs[key]
    if (!input) throw new Error(`Invalid input: ${key}`)
    const value = input.default
    if(!value) throw new Error(`Input ${key} has no default value`)
    return value
  }

  setOutput(key, value) {
    info(`${key}, ${value}`)
    CoreMock.OUTPUTS[key] = value
  }

  getOutputs() {
    return CoreMock.OUTPUTS
  }

  setFailed(err) {
  }
}

exports.core = isLocal ? new CoreMock : core
