// firt we need to pass "model" name such as "get,post,put"
// sedon one is the "populate" if you want to populate
// it is a function in function which is return a middilware
// after "async" is a middileware
// it is  a function that return a middleware
const query =(model,populate)=>async(req,res,next)=>{

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
        // we can do that instead of searh in query line
        // which means that ,i am loooking  for "New" in title
        // and i dont care if it is low or capital case
        // {title:{$regex:'New', $options:'i'}}
        // console.log(search)
        // the model become a "post"// we add that in posts routes
        // inside of the query as paramater
        search[key] = {$regex:search[key], $options:'i'}
        console.log(search)
        let query =  model.find(search).populate(populate)
        
        console.log(query)
        //--------------------
        // Select Functionaltiy
        //------------------
        // url:  http://localhot:500?select=title,content
        if(req.query.select){
           // "req.query.select" is already comma sperator
           // such as out put will be "title,content,published"
           // so i want it to convert it to a 'space sperator'
           // that is why , we use split(',') and this will return u as an array
           // then we should conver it to a string and seperating by space
           // we need to use "join(" ")" , this will retun it as string and with space
            const fields = req.query.select.split(',').join(' ')
            console.log(fields)
            // in that line , we only show the select fields
            // otherwise , it shows the all object that you search
             query = query.select(fields)

        }


        //------------------
        // Sort Functionality
        //------------------
       // url:  http://localhot:500?serach[title]=game&sort=-title
       // +ve asc order , -ve desc order
       if(req.query.sort){
        query = query.sort(req.query.sort)
       }else{
        // if i dont pass "sort query"
        // by default it will be allways at the top descendignly
        query = query.sort('-createdAt')
       }

       //------------------------
        // Pagination
        //-------------------------

        // url: http://localhost:5000?page=3&limit=5
    
        //console.log(typeof req.query.page)
        //console.log(typeof req.query.limit)
        // these two are "string"
        // but for limit() i need a number

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const startIndex = (page-1)*limit
        const endIndex = page*limit
          // need to get total number of documents
          // we check how many "Post(model)"", we have and getting number of ot
        const total = await model.countDocuments()
        query = query.skip(startIndex).limit(limit)
        const pagination = {page,limit,totalPages: Math.ceil(total/limit)} 

        // what is the next page number and last page number
        if(endIndex<total) pagination.next = {page: page+1, limit}
        if(startIndex>0) pagination.previous = {page:page-1,limit}


        if(populate && !req.query.select) query = query.populate(populate);

        // i am waitng the query in here because, i can add a another query after adding search
        // execute the query and fetch data from database
        const results = await query
        res.results ={
           success:true,
           count:results.length,
           data :results,
           pagination
        }
        // console.log(query)


        
          

    next()

}
module.exports = query
