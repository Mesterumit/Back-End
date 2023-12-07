
module.exports = (req,res,next)=>{

    //Searching & Sorting & Pagination 

    //Searching: URL?search[key1]=value1&search[key2]=value2
    const search = req.query?.seacrh || {}
    for(let key in search) search[key] = {$regex: search[key], $options:'i'}

    //Mongose = 8.0 --> SORTING: URL?sort[key]=asc&sort[key2]=desc (acs:A->Z, desc:Z->A )
    const sort = req.query?.sort || {}


    //Pagination: URL?page=1&limit=10

    //LIMIT
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20 )

    //PAGE
    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) -1

    //SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page*limit)

    //Run SearchinSortingPagination engine for Model:

    res.getModelList = async function(Model,filters={}, populate = null){

        const filersAndSearch ={...filters, ...search}

        return await Model.find(filersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

     // Details:
     res.getModelListDetails = async function (Model, filters = {}) {

        const filtersAndSearch = { ...filters, ...search }

        const data = await Model.find(filtersAndSearch)

        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}





// router.get('/products', async (req, res, next) => {
//     try {
//       // Custom filters: Only retrieve products in the "Electronics" category
//       const customFilters = { category: 'Electronics' };
  
//       // Use res.getModelList to get a list of products with custom filters
//       const productList = await res.getModelList(Product, customFilters, null);
  
//       // Respond with the product list
//       res.json(productList);
//     } catch (error) {
//       // Handle errors, maybe use the ErrorResponse utility
//       next(new ErrorResponse(500, 'Internal Server Error'));
//     }

// Using Fetch API
// fetch('/api/users?search[name]=John&filters[status]=active&filters[category]=A')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));