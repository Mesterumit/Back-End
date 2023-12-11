const Department = require('../models/Department');
const Personnel = require('../models/Personnal');
const connectDB = require('../config/db');
require('colors');
require('dotenv').config({path:'../.env'})

const departments = ['FullStack Department', 'DevOps Department', 'CyberSec Department']


connectDB();

departments.forEach(async(dept)=>{
   const department= await  Department.create({name: dept})
   console.log(`${dept} - Added`)
   for(let i in [...Array(10)]){
    Personnel.create({
        departmentId: department._id, 
        username: `test ${i}`,
        password:'1234',
        firstName:'firstname', 
        lastName:'lastName', 
        phone:'123456789',
        email:`test${i}@company.com`,
        title: "title", 
        salart: 2500,
        description:"description", 
    })
   }
})