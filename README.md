# zaunmap-backend

## user

### get
 - route: /user
 - method: get
 - type: public
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

### list
 - route: /user/list
 - method: get
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
        ...
    ]
    ```
 - todo: *needs to be improved to include a token to verify that the user is the admin.*

## list

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
        ...
    ]
    ```

### public
 - route: /list/public
 - method: get
 - type: public
 - args: (empty)
 - payload: (empty)
 - return: 
    ```json
    [
        {
            "map_id": "",
            "map_name": "",
            "owner": "",
            "created_time": "",
            "public": true,
            "likes": 0,
            "dislikes": 0,
        },
        ...
    ]
    ```

## file

**NOTE: THIS IS PART OF MIDLLEWARE.**

### upload
 - route: /file
 - method: post
 - type: middleware
 - args: user_id(str)
 - payload: (raw data)
 - return: 
    ```json
    {
        "status": "",
        "object_id": "",
    }
    ```
 - note: *this would be a middleware implemented by @MingkaiChen running in cloudflare workers to upload files correctly to the object storage and return the id of that object.*

### download
 - route: /file
 - method: get
 - type: middleware
 - args: user_id(str), object_id(str)
 - payload: (empty)
 - return: (raw data)
 - note: *this would be a middleware implemented by @MingkaiChen running in cloudflare workers to download files correctly from the object storage.*

### modify
 - route: /file
 - method: put
 - type: middleware
 - args: user_id(str), object_id(str)
 - payload: (raw data)
 - return: (HTTP_CODE ONLY)
 - note: *this would be a middleware implemented by @MingkaiChen running in cloudflare workers to modify files correctly from the object storage. **Should be only callable by back-end**.*

### delete
 - route: /file
 - method: delete
 - type: middleware
 - args: user_id(str), object_id(str)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - note: *this would be a middleware implemented by @MingkaiChen running in cloudflare workers to delete files correctly from the object storage. **Should be only callable by back-end**.*

## map

### create
 - route: /map/create
 - method: post
 - type: restricted
 - args: user_id(str)
 - payload: (empty)
 - return: (HTTP_CODE ONLY)
 - todo: *needs to be improved to include a token to verify that only logged-in users can create.*

### import
 - route: /map/import
 - method: put
 - type: restricted
 - args: user_id(str), map_id(str)
 - payload: 
    ```json
    {
        "format": "",
        "object_id": "",
    }
    ```
 - return: (HTTP_CODE ONLY)
 - note: *The backend gets the corresponding uploaded file from the object storage using user_id and object_id, converts it to geojson format and creates the corresponding geojson in the object storage. It then converts it to geojson format and creates the corresponding geojson in the object storage, passing the object_id of the created geojson back to the frontend. Note that the object_id is an uuid.*
 - todo: *needs to be improved to include a token to verify that only logged-in users can import to their own map.*

### get
 - route: /map/get
 - method: get
 - type: restricted
 - args: user_id(str), map_id(str)
 - payload: (empty)
 - return:
    ```json
    {
        "_id": "",
        "map_name": "",
        "owner": "",
        "created_time": "",
        "public": false,
        "likes": 0,
        "dislikes": 0,
        "object_id": "",
        "tags": [],
        "description": "",
    }
    ```
 - todo: *needs to be improved to include a token to verify the user's permission.*

### edit
***TODO***