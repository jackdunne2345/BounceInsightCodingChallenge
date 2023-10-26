import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import readline from 'readline';
const path = require('path')
const app = express();
const port = process.env.port||3000;




app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../../front-end/dist'))) 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front-end/dist', 'index.html'));
});

app.post('/getCountryInfo', async (req: Request, res: Response) => {
  try {
    const countryName: string = req.body.countryName;
    if (!countryName) {
      throw new CustomError('Country name is missing.', 400);
    }

  await  axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if(response.data[0]){
          const countryData = response.data[0];
          res.json(countryData);}

      })
      .catch(error => {
        if (error.response) {
          res.status(error.response.status).json({ error: error.response.data });
        } else {
          res.status(500).json({ error: 'An error occurred while fetching country information.' });
        }
      });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({error:{status:error.status, message: error.message }});
    } else {
      
      res.status(500).json({ error: 'An error occurred while fetching country information.' });
    }
    console.log(error)
  }
});


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Press "q" and Enter to close the server: ', (answer) => {
  if (answer === 'q') {
    console.log('Closing the server...');
    server.close(() => {
      console.log('Server has been closed.');
      rl.close();
    });
  }
});

class CustomError extends Error {
  status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
  }
}