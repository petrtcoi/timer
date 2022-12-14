import app from './app'

const port = process.env.PORT
const mode = process.env.MODE


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}. Mode: ${mode}`)
});

