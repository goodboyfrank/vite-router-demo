import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin';


// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      react(),
      sentryVitePlugin({
        org: "qingshui",
        project: "watch-react-error",
        cleanArtifacts:true,
        // Specify the directory containing build artifacts
        include: "./dist",
        // ext: ['js', 'jsx'],
        release:'1.0.2',
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: 'b8e5316a14b442bc91b1f0d8319a042ec80e0efebefc4ffc8e018f079faa893f',
      }),
    ],
  }
});
