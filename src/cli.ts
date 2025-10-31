import chalk from 'chalk'
import Table from 'cli-table3'
import simpleGit from 'simple-git'
import { checkFileComments } from './utils/check-file-comments'
const git = simpleGit()

export async function main() {
  const args = process.argv.slice(2)
  const strict = args.includes('--strict')

  console.log(
    chalk.cyan(
      strict
        ? '🔍 Strict mode: checking all variable declarations...'
        : '🔍 Checking comments only in changed lines...',
    ),
  )

  const diff = await git.diff(['--cached', '--name-only'])
  const files = diff.split('\n').filter((f) => f.match(/\.(t|j)sx?$/) && f.trim())

  if (!files.length) {
    console.log(chalk.gray('No changed TS/JS files in this commit.'))
    return
  }

  const results: any[] = []
  for (const file of files) {
    const res = await checkFileComments(file, strict)
    results.push(...res)
  }

  if (results.length) {
    console.log(chalk.yellow('\n⚠️  Missing annotation comments:\n'))
    const table = new Table({
      head: ['File', 'Line', 'Declaration'],
      colWidths: [40, 8, 60],
    })
    for (const r of results) {
      table.push([chalk.red(r.filePath), chalk.yellow(r.line.toString()), chalk.white(r.code)])
    }
    console.log(table.toString())
    console.log(chalk.red('\n❌ Please add comments above these declarations.'))
    process.exit(1)
  } else {
    console.log(chalk.green('\n✅ All variable declarations have comments!'))
  }
}
