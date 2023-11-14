// firt we need to pass "model" name such as "get,post,put"
// sedon one is the "populate" if you want to populate
// it is a function in function which is return a middilware
// after "async" is a middileware
// it is  a function that return a middleware
const query =(model)=>async(req,res,next)=>{

    //-----------------
    //search Functionality
    //---------------------
    // i want something like that with two diffrient search end point
    // url:  http://localhot:500?search[title]=value&&search[content]=value

    // it is an object , so u can access any property inside of it
    // "req.query.search" search will be atteched to the query
    const search = req.query.search || {}
    // so "key" is the index 
    // we go throug the object and we are looking for the value of the search
    for(let key in search)
        // $regex => regular expression
        // most of the MongoDb operator start with "$" sign
        // "i" is a case Insensitive
        search[key]= {$regex:search[key], $options:'i'}

        // console.log(search)
        // the model become a "post"// we add that in posts routes
        // inside of the query as paramater
        const result = await model.find(search)
        console.log(result)
    

    next()

}
module.exports = query
