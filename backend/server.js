import express from 'express';
import cors from 'cors';
import router from "./src/routes.js"
import { errorHandler } from './src/middleware/errorHandler.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.use(errorHandler);

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});