const query = (model, populate) => async (req, res, next) => {
    //-------------------
    // Search function
    // -------------------
    // localhost:5000?search[title]=value&search[userId.name]=john
    // Loop through the object
      const search = req.query.search || {}
      for (let key in search)
        search[key] = { $regex: search[key], $options: "i" }; // i: case Insensitive
  
     let query = model.find(search);
    // ---------------------
    // Select Function
    // ----------------------
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }
    // ---------------
    // Sort Function
    // --------------
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      // Default sort
      query = query.sort("-createdAt");
    }
    // ----------------
    // Pagination
    // ----------------
    // url = http://localhost:5000/posts?page=1&limit=5
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();
    query - query.skip(startIndex).limit(limit);
    const pagination = { page, limit };
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };
  
    if (populate && !req.query.select) query = query.populate(populate);
    // Execute the query and fetch data from database;
    const results = await query;
    // attach all response to res.result
    res.results = {
      success: true,
      count: results.length,
      data: results,
      pagination,
    };
  
    next();
  };
  
  module.exports = query;