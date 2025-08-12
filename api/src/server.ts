import { app } from '@/app'
import { env } from '@/env'

const port = env.API_PORT

try{
  await app.listen({
    host: '0.0.0.0',
    port,
  })

  console.log(`
    ✏️  HTTP Server Running on port: ${port}!
    
    See the docs on:
    ${env.NODE_ENV === 'dev' ? 'http' : 'https'}://${env.API_HOST}:${port}/docs
    ${env.NODE_ENV === 'dev' ? 'http' : 'https'}://${env.API_HOST}:${port}/reference
    `)

} catch (error) {
  app.log.error(error);
  process.exit(1);
}


// app
//   .listen({
//     host: '0.0.0.0',
//     port,
//   })
//   .then(() => {
//     console.log(`
//       ✏️  HTTP Server Running on port: ${port}!
      
//       See the docs on:
//       http://localhost:${port}/docs
//       http://localhost:${port}/reference
//       `)
//   })
