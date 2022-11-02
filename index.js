const express = require('express');
const app = express();
// const cors = require('cors')
const router = require('./routes')
const PORT = process.env.PORT || 2003

// app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router)

app.listen(PORT, ()=>{
    console.log(`app runing di port ${PORT}`);
});