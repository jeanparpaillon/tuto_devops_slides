import { defineConfig } from 'slidev'

export default defineConfig({
  publicDir: 'slides/public',
  shiki: {
    langs: [
      'docker',        // or "dockerfile"
      'bash',
      'yaml',
      'json',
    ],
  },
})
