# PERSONNEL API

* copy  "src" folder (file structure) of BLOGAPI to here; continue with build index.js
* or Start from "starterProject" folder.
 
### index.js
 
```js
"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */



// continue from here...



/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
```

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    src/
        configs/
            dbConnection.js
        controllers/
            department.controller.js
            personnel.controller.js
        helpers/
            passwordEncrypt.js
        middlewares/
            errorHandler.js
            findSearchSortPage.js
        models/
            department.model.js
            personnel.model.js
        routes/
            department.router.js
            personnel.router.js
```

* Write Models->Controllers->Routers

    * Basic CRUD process
    * Check PersonnelModel -> "email validate" & "password set"
    * List "Personnels of Department" (/departments/:id/personnels)
        * Add "filters" parameter in "getModelList" in findSearchSortPage
    * Set "isLead" when Create/Update personnel
    * PersonnelController -> login/logout

* check login/logout (so session) from index.js:
```js
...
// Session Login/Logout Control Middleware
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) {
        //     req.isLogin = true
        // }
        req.isLogin = user && user?.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})
...
```

TEST DATA
```json
{
    "name": "FullStack Department"
}
{
    "departmentId": "departmentId",
    "username": "test",
    "password": "1234",
    "firstName": "firstName",
    "lastName": "lastName",
    "phone": "123456789",
    "email": "email@site.com",
    "title": "title",
    "salary": 2500,
    "description": "description",
    "isActive": true,
    "isAdmin": true,
    "isLead": true,
    "startedAt": "2023-10-15 13:14:15"
}
```