const mongoose= require('mongoose');




const url ="mongodb+srv://ujjwalwanjari:Ujjwalbhau@cluster0.iichtoo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(()=>{
    console.log("connection succesful");
}).catch((err)=>console.log(err));
