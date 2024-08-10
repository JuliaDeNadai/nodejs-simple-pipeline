import express, {Router} from "express";
import morgan from "morgan";


export const app = express()
const route = Router()
app.use(morgan('tiny'))

route.get('/healthcheck', (req, res) => {
  res.sendStatus(200)
})

app.use(express.json())
app.use(route)

const port = 3000

app.listen(port, () => { return `Listening on port... ${port}`})

