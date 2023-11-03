// const apikey = 1992;

// const checkApiKey = (req,res,next)=>{
//     const {key} = req.body;

//     if(!key || key !==apikey){
//         return res.status(401).send({message:"Unauthorized, Invalid API KEY"})
//     }
//     next()
// }

// module.exports = {checkApiKey}

// authenticationMiddleware.js
const apikey = process.env.API_KEY 
// const apiKey = '1992';

const checkApiKey = (req, res, next) => {
    const key = req.headers['x-api-key'];

    if (!key || key !== apikey) {
        return res.status(401).send({ message: 'Unauthorized. Invalid API key.' });
    }

    next();
};

module.exports = { checkApiKey };
