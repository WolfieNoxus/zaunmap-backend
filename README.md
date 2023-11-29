# zaunmap-backend

## https://zaunmap-6b1455b08c9b.herokuapp.com/api

## user

### get
 - route: /user
 - method: GET
 - args: user_id(str)
 - payload: (empty)
 - return: 
    ```json
    {
        "user_id": "",
        "user_name": "",
        "role": "",
    }
    ```

### rename
 - route: /user/rename
 - method: put
 - type: restricted
 - args: user_id(str), new_name(str)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - todo: *needs to be improved to include a token to verify that the user can only change their own name.*

### restrict
 - route: /user/restrict
 - method: put
 - type: admin-only
 - args: user_id(str), restrict(bool)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - todo: *needs to be improved to include a token to verify that the user is the admin.*

### disable
 - route: /user/disable
 - method: put
 - type: admin-only
 - args: user_id(str), disable(bool)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - todo: *needs to be improved to include a token to verify that the user is the admin.*

### maps
 - route: /user/maps
 - method: GET
 - type: admin-only
 - args: (empty)
 - payload: (empty)
 - return: 
    ```json
    [
        {
            "user_id": "",
            "user_name": "",
            "role": "",
        },
    ]
    ```
 - todo: *needs to be improved to include a token to verify that the user is the admin.*

### get
 - route: /list/get
 - method: get
 - type: restricted
 - args: user_id(str)
 - payload: (empty)
 - return: 
    ```json
    [
        {
            "map_id": "",
            "map_name": "",
            "owner": "",
            "created_time": "",
            "public": false,
            "likes": 0,
            "dislikes": 0,
            "tags": [],
            "description": "",
        },
    ]
    ```

## map

### create
 - route: /map
 - method: POST
 - type: restricted
 - args: user_id(str)
 - payload: (empty)
 - return:
   ```json
    {
            "_id": "",
            "name": "",
            "author": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
            "object_id": "",
            "description": "",
            "tags": [],
            "createdAt": 2023-11-28T15:47:18.178+00:00,
            "updatedAt": 2023-11-28T15:47:18.178+00:00,
    }
    ```
 - todo: *needs to be improved to include a token to verify that only logged-in users can create.*

### update map metadata
 - route: /map
 - method: POST
 - args: _id(str)
 - payload:
   ```json
    {
            "_id": "",
            "name": "",
            "author": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
            "object_id": "",
            "description": "",
            "tags": [],
            "createdAt": 2023-11-28T15:47:18.178+00:00,
            "updatedAt": 2023-11-28T15:47:18.178+00:00,
    }
    ```
 - return: (HTTP_CODE ONLY)

### import
 - route: /map/import
 - method: put
 - type: restricted
 - args: user_id(str), map_id(str)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - note: *The backend gets the corresponding uploaded file from the object storage using user_id and object_id, converts it to geojson format and creates the corresponding geojson in the object storage. It then converts it to geojson format and creates the corresponding geojson in the object storage, passing the object_id of the created geojson back to the frontend. Note that the object_id is an uuid.*
 - todo: *needs to be improved to include a token to verify that only logged-in users can import to their own map.*

### get
 - route: /map
 - method: get
 - type: restricted
 - args: _id(str)
 - payload: (empty)
 - return:
    ```json
    {
            "_id": "",
            "name": "",
            "author": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
            "object_id": "",
            "description": "",
            "tags": [],
            "createdAt": 2023-11-28T15:47:18.178+00:00,
            "updatedAt": 2023-11-28T15:47:18.178+00:00,
    }
    ```
 - todo: *needs to be improved to include a token to verify the user's permission.*

### public
 - route: /map/public
 - method: GET
 - args: (empty)
 - payload: (empty)
 - return: 
    ```json
    [
        {
            "_id": "",
            "name": "",
            "author": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
            "object_id": "",
            "description": "",
            "tags": [],
            "createdAt": 2023-11-28T15:47:18.178+00:00,
            "updatedAt": 2023-11-28T15:47:18.178+00:00,
        },
    ]
    ```
### all
 - route: /map/all
 - method: GET
 - args: (empty)
 - payload: (empty)
 - return: 
    ```json
    [
        {
            "_id": "",
            "name": "",
            "author": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
            "object_id": "",
            "description": "",
            "tags": [],
            "createdAt": 2023-11-28T15:47:18.178+00:00,
            "updatedAt": 2023-11-28T15:47:18.178+00:00,
        },
    ]
    ```
