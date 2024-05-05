const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.static('public'))


app.get('/', (req, res)=>{
   res.send('<h1>welcome to get route</h1>')
})

const PORT = process.env.PORT || 4444;
app.listen(PORT, ()=>{
   console.log('app is running on port '+ PORT);
   

   const dbConnect = async () => {
      try {
        await mongoose.connect('mongodb+srv://weather:39Yp806B8REgYAO7@cluster0.clwxeiy.mongodb.net/weather?retryWrites=true&w=majority&appName=Cluster0', {
         //  useNewUrlParser: true,
         //  useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        
      }
    };
    dbConnect();
})

