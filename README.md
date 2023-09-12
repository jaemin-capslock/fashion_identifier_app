# Fashion Image Classification

This project is my webapp implementation of fashion image classification. Users can submit fashion images, which are then stored in an S3 bucket. This action triggers an AWS Lambda function that utilizes a PyTorch image classification model to classify the image based on gender, color, and type of clothing. The inference results are subsequently displayed on the website.

# How to build

You would need a .env file of the S3 bucket name and API key, as well as the Lambda function key. 

First, cd into backend and run `node backend/server.js` to start the backend server (S3 uploader) in `localhost:8000`.

Then run `npm start` to start React frontend.