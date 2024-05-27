import express from 'express';
import cors from 'cors';
import router from "./src/routes.js"
import { errorHandler } from './src/middleware/errorHandler.js'

const app = express();

app.use(cors());
app.use("/", router);

app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});