import { app } from '@/app'
import { env } from '@/env'

const port = env.API_PORT

app
  .listen({
    host: '0.0.0.0',
    port,
  })
  .then(() => {
    console.log(`✏️ HTTP Server Running on port: ${port}!`)
  })
