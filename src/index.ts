#!/usr/bin/env node
import { main } from './cli'

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
