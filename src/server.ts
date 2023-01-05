import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path'


import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})



var corsOptions = {
  origin: 'https://frontend-one-mauve.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/lucas', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.listen(4000, () => console.log('Servidor online!!!!'))