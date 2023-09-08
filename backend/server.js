import express from 'express';
import { generateUploadURL } from './s3.js';
const app = express();

// app.use(express.json());



app.get('/s3Url', async (req, res) =>{

    console.log("request made")
    const url = await generateUploadURL()
    console.log(url)
    res.json({url})
})

app.listen(8080, () => console.log("listening on port 8080"))