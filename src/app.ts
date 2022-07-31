import express from 'express';
require("dotenv").config();

const app = express();




// Get port from environment file
const port = parseInt(process.env.PORT ?? "3000");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});