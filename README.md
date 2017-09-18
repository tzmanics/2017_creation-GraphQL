# ⚒ Creations: Koa API 🤖
An API created for a Postgres DB using Koa.

Use `npm start` to up the project and head over to `http://localhost:1337/`.

Run `npm test` to run tests (using mocha & chai).

---

## 1. Creations API
### 1.1 GET all creations

| URL    | `/api/v1/creations` |
|--------|---------------------|
| Method | `GET`               |

#### 1.1.1 Description
Gets a list of all the creation items.

#### 1.1.2 Response
Returns an object containing the `status` and `data` properties.

If `status` is `success`, it will return a status code of `200` and `data` will contains an array of all the creations objects or an empty object if there are no creations.

#### 1.1.3 Response Example
```json
{
  "status":"success",
  "data":[
    {
      "id":1,
      "title":"Test Tech Project",
      "description":"A project made with tech",
      "materials":"koa, postgres, mocha, chai",
      "category":"tech",
      "image":"http://bit.ly/2xTwAcl"
    },{
      "id":2,
      "title":"Test Craft Project",
      "description":"A project made with craft",
      "materials":"beech, hand saw, chisel",
      "category":"craft",
      "image":"http://bit.ly/2wRVdqy"
    }
  ]
}
```

### 1.2 GET one creation

| URL    | `/api/v1/creations/<id>` |
|--------|---------------------|
| Method | `GET`               |

#### 1.2.1 Description
Gets one of the creation items.

#### 1.2.2 Response
Returns an object containing the `status` and `data` or `message` properties.

If `status` is `success`, it will return a status code of `200` and `data` will contain an array of the creation matching the `id` and its properties.

If there is no creation that matches the requested `id`, `status` is `error`, it will return a status code of `404` and the `message` will contain an error message.

#### 1.2.3 Response Example
```json
{
  "status":"success",
  "data":[
    {
      "id":1,
      "title":"Test Tech Project",
      "description":"A project made with tech",
      "materials":"koa, postgres, mocha, chai",
      "category":"tech",
      "image":"http://bit.ly/2xTwAcl"
    }
  ]
}
```

```json
{
  "status":"error",
  "message":"That creation does not exist."
}
```
### 1.3 POST one creation

| URL    | `/api/v1/creations` |
|--------|---------------------|
| Method | `POST`               |

#### 1.3.1 Description
Posts a new creation item.

#### 1.3.2 Body Arguments
|Name       |Types | Description                                         |Req'd|
|-----------|------|-----------------------------------------------------|-----|
|title      |string|The title of the creation.                           |yes  |
|description|string|The description of the creation.                     |yes  |
|materials  |string|Materials used to create the creation.               |yes  |
|image      |string|A link to an image of the creation.                  |yes  |
|category   |string|The category of the creation, e.g. wood, clay, web   |yes  |

#### 1.3.3 Body
```json
{
  "title":"Pangolin Print",
  "description":"A hand-carved relief print plate of a pangolin",
  "materials":"birch plywood, chisels, toner print, mineral spirits (for transfer)",
  "image":"http://bit.ly/2ftvayn",
  "category":"craft"
}
```

#### 1.3.4 Response
Returns an object containing the `status` and `data` or `message` properties.

If `status` is `success`, it will return a status code of `201` and `data` will be an array containing an object of the creation that was added.

If the body or payload is malformed `status` is `error` and it will return a status code of `400` and the `message` will contain an error message.

#### 1.3.5 Response Example
```json
{
  "status":"success",
  "data":[
    {
      "id":5,
      "title":"Pangolin Print",
      "description":"A hand-carved relief print plate of a pangolin",
      "materials":"birch plywood, chisels, toner print, mineral spirits (for transfer)",
      "image":"http://bit.ly/2ftvayn",
      "category":"craft"
    }
  ]
}
```

```json
{
  "status":"error",
  "message":"Something went wrong."
}
```
