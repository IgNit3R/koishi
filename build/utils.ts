import { resolve } from 'path'
import globby from 'globby'
import spawn from 'cross-spawn'

export const cwd = resolve(__dirname, '..')

export function getWorkspaces () {
  return globby(require('../package').workspaces, {
    cwd,
    deep: 0,
    onlyDirectories: true,
  })
}

export type DependencyType = 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies'

export interface PackageJson extends Partial<Record<DependencyType, Record<string, string>>> {
  name?: string
  private?: boolean
  version?: string
}

export function spawnSync (command: string, silent?: boolean) {
  if (!silent) console.log(`$ ${command}`)
  const result = spawn.sync(command + ' --color', { encoding: 'utf8' })
  if (result.status) {
    throw new Error(result.stderr)
  } else {
    if (!silent) console.log(result.stdout)
    return result.stdout.trim()
  }
}
