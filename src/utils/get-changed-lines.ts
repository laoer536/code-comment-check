import simpleGit from 'simple-git'

const git = simpleGit()

export async function getChangedLines(filePath: string): Promise<Set<number>> {
  const diff = await git.diff(['--cached', '--unified=0', filePath])
  const changedLines = new Set<number>()

  const hunkRegex = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm
  let match: RegExpExecArray | null

  while ((match = hunkRegex.exec(diff))) {
    const start = parseInt(match[1], 10)
    const count = match[2] ? parseInt(match[2], 10) : 1
    for (let i = start; i < start + count; i++) {
      changedLines.add(i)
    }
  }

  return changedLines
}
