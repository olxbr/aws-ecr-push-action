import * as core from '@actions/core';

export const IsPre = !!process.env['STATE_isPre'];
export const IsPost = !!process.env['STATE_isPost'];
export const tmpDir = process.env['STATE_tmpDir'] || '';

export function setTmpDir(tmpDir: string) {
  core.saveState('tmpDir', tmpDir);
}

if (!IsPre) {
  core.saveState('isPre', 'true')
} else if (IsPre && !IsPost) {
  core.saveState('isPost', 'true')
}
