import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Frontend will call /gql and Vite will forward it to Heroku
      '/gql': {
        target: `https://www.themealdb.com/api/json/v1/1/search.php?s=paneer`,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gql/, '/graphql'),
      },
    },
  },
})