import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Serves the Vercel functions in `api/` during `npm run dev`, so the affiliate
 * flow behaves locally exactly as it does in production. Dev only — in
 * production Vercel runs these files itself.
 */
function devApiPlugin(): Plugin {
  return {
    name: 'earnergy-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/affiliate', (req, res) => {
        void (async () => {
          try {
            const requestUrl = new URL(
              (req as { originalUrl?: string }).originalUrl ?? req.url ?? '/',
              'http://localhost',
            )
            const query: Record<string, string> = {}
            requestUrl.searchParams.forEach((value, key) => {
              query[key] = value
            })

            let body: string | undefined
            if (req.method !== 'GET' && req.method !== 'HEAD') {
              const chunks: Buffer[] = []
              for await (const chunk of req) chunks.push(chunk as Buffer)
              body = Buffer.concat(chunks).toString('utf8')
            }

            /* minimal VercelRequest / VercelResponse surface */
            const vercelReq = Object.assign(req, { query, body })
            const vercelRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code
                return vercelRes
              },
              json(data: unknown) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
                return vercelRes
              },
              send(data: unknown) {
                res.end(typeof data === 'string' ? data : JSON.stringify(data))
                return vercelRes
              },
            })

            const mod = (await server.ssrLoadModule('/api/affiliate.ts')) as {
              default: (request: unknown, response: unknown) => Promise<unknown>
            }
            await mod.default(vercelReq, vercelRes)
          } catch (error) {
            server.config.logger.error(`[dev api] ${String(error)}`)
            if (!res.writableEnded) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'Dev API error' }))
            }
          }
        })()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  /* the api/ handlers read process.env, so mirror .env into it during dev */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@home': path.resolve(__dirname, './src/home'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
