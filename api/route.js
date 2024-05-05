const router = require('express');
const History = require('./History');
const route = router.Router();

route.get('/', async(req, res)=>{
   try {
      const history = await History.find();
      if(!history.length){
       return  res.status(404).json({message: 'data not found'})
      }
      res.status(200).json({
         success: true,
         message: "all data find successfully",
         data: history,
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error Occurred",
      })
   }
})

route.post('/', async(req, res)=>{
   let history =  req.body
   console.log(history);
   try {
      let insertData = await History.create(history);
      res.status(200).json({
         success: true,
         message: "Data Save Successfully",
         data: insertData,
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error Occurred",
      })
   }
})

module.exports = route; 