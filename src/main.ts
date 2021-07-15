import * as fs from 'fs';
import * as buildx from './buildx';
import * as context from './context';
import * as stateHelper from './state-helper';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {checkImageThreats} from './x9';
import {dockerLoginOnECR, getRepositoryUri} from './ecr';

async function run(): Promise<void> {
  try {
    core.startGroup(`Docker info`);
    await exec.exec('docker', ['version']);
    await exec.exec('docker', ['info']);
    core.endGroup();

    await dockerLoginOnECR();

    if (!(await buildx.isAvailable())) {
      core.setFailed(`Docker buildx is required. See https://github.com/docker/setup-buildx-action to set up buildx.`);
      return;
    }
    stateHelper.setTmpDir(context.tmpDir());

    const buildxVersion = await buildx.getVersion();
    const defContext = context.defaultContext();
    let inputs: context.Inputs = await context.getInputs(defContext);

    const repository = await getRepositoryUri(inputs.ecrRepository);
    if (repository.repositoryUri === undefined) {
      throw new Error(`failed to get repositoryUri`);
    }
    const ecrTags = await context.generateECRTags(repository.repositoryUri, inputs.tags);
    inputs.tags = ecrTags;

    const args: string[] = await context.getArgs(inputs, defContext, buildxVersion);
    await exec
      .getExecOutput('docker', args, {
        ignoreReturnCode: true
      })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
          throw new Error(`buildx failed with: ${res.stderr.match(/(.*)\s*$/)![0].trim()}`);
        }
      });

    const imageID = await buildx.getImageID();

    await checkImageThreats({
      image: inputs.tags[0],
      ignoreThreats: inputs.ignoreThreats,
      minimalSeverity: inputs.minimalSeverity,
      x9ContainerDistro: inputs.x9ContainerDistro
    });

    if (inputs.push) {
      const imgName = ecrTags[0].replace(':latest', '');
      const pushArgs = ['push', '-a', imgName];
      await exec
        .getExecOutput('docker', pushArgs, {
          ignoreReturnCode: true
        })
        .then(res => {
          if (res.stderr.length > 0 && res.exitCode != 0) {
            throw new Error(`push failed with: ${res.stderr.match(/(.*)\s*$/)![0].trim()}`);
          }
        });
    }

    if (imageID) {
      core.startGroup(`Extracting digest`);
      core.info(`${imageID}`);
      context.setOutput('digest', imageID);
      core.endGroup();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function cleanup(): Promise<void> {
  if (stateHelper.tmpDir.length > 0) {
    core.startGroup(`Removing temp folder ${stateHelper.tmpDir}`);
    fs.rmdirSync(stateHelper.tmpDir, {recursive: true});
    core.endGroup();
  }
}

if (stateHelper.IsPre && !stateHelper.IsPost) {
  run();
} else if (!stateHelper.IsPre || stateHelper.IsPost) {
  cleanup();
}
