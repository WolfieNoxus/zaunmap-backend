# ZaunMap Backend API Documentation

## Base URL
`https://zaunmap-6b1455b08c9b.herokuapp.com/api`

## Authentication
ZaunMap Backend API uses Auth0 for authentication. To authenticate, a user must first register an account with Auth0. Once registered, the user can then login to receive an access token. Some endpoints require an access token to be provided in the request header. The access token is used to identify the user and determine whether the user has permission to access the endpoint.

## Endpoints

### Comment Endpoints

#### Get Comment
- **Endpoint:** `/comment`
- **Method:** GET
- **Parameters:**
  - `commentId` (required): The id of the comment to retrieve.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/comment?commentId=65680d250505420b42427a82
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test comment",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [],
        "dislikes": [],
        "replies": [
            "65680d840505420b42427a8e"
        ],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Create Comment
- **Endpoint:** `/comment`
- **Method:** POST
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/comment
    ```
- **Example Payload:**
    ```json
    {
        "mapId": "65680d250505420b42427a82",
        "content": "This is a test comment"
    }
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test comment",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [],
        "dislikes": [],
        "replies": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Reply Comment
- **Endpoint:** `/comment/reply`
- **Method:** POST
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/reply
    ```
- **Example Payload:**
    ```json
    {
        "commentId": "65680d250505420b42427a82",
        "content": "This is a test reply"
    }
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d840505420b42427a8e",
        "content": "This is a test reply",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [],
        "dislikes": [],
        "replies": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Like/Unlike Comment
- **Endpoint:** `/comment/like`
- **Method:** PUT
- **Parameters:**
  - `commentId` (required): The id of the comment to like.
  - `like` (required): Boolean value indicating whether to like or unlike.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/like?commentId=65680d250505420b42427a82&like=true
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test comment",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [
            "auth0|656669d317b4bdb501178567"
        ],
        "dislikes": [],
        "replies": [
            "65680d840505420b42427a8e"
        ],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Dislike/Undislike Comment
- **Endpoint:** `/comment/dislike`
- **Method:** PUT
- **Parameters:**
  - `commentId` (required): The id of the comment to dislike.
  - `dislike` (required): Boolean value indicating whether to dislike or undislike.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/dislike?commentId=65680d250505420b42427a82&dislike=true
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test comment",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [],
        "dislikes": [
            "auth0|656669d317b4bdb501178567"
        ],
        "replies": [
            "65680d840505420b42427a8e"
        ],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Delete Comment
- **Endpoint:** `/comment`
- **Method:** DELETE
- **Parameters:**
  - `commentId` (required): The id of the comment to delete.
- **Example Request:**
    ```
    DELETE https://zaunmap-6b1455b08c9b.herokuapp.com/api/comment?commentId=65680d250505420b42427a82&userId=auth0|656669d317b4bdb501178567
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test comment",
        "postedBy": "auth0|656669d317b4bdb501178567",
        "likes": [],
        "dislikes": [],
        "replies": [
            "65680d840505420b42427a8e"
        ],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

### Map Endpoints

#### Get Map
- **Endpoint:** `/map`
- **Method:** GET
- **Parameters:**
  - `mapId` (required): The id of the map to retrieve.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?mapId=65680d250505420b42427a82
    ```
- **Example Response:**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Search Public Maps
- **Endpoint:** `/map/search`
- **Method:** GET
- **Parameters:**
  - `name` (optional): The name of the map to search for.
  - `tags` (optional): The tags of the map to search for.
  - `sortBy` & `sortOrder` (optional): The field to sort by and the order to sort by.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/map/search?name=testmap&tags=tag1,tag2&sortBy=name&sortOrder=asc
    ```
- **Example Response**
    ```json
    [
        {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
        },
        {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
        }
    ]
    ```

#### Create Map
- **Endpoint:** `/map`
- **Method:** POST
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/map
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Update Map
- **Endpoint:** `/map`
- **Method:** PUT
- **Parameters:**
  - `mapId` (required): The id of the map to update.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?mapId=65680d250505420b42427a82
    ```
- **Example Payload:**
    ```json
    {
        "name": "testmap",
        "isPublic": true,
        "tags": ["tag1", "tag2"],
        "description": "This is a test map"
    }
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Rate Map
- **Endpoint:** `/map/rate`
- **Method:** PUT
- **Parameters:**
  - `mapId` (required): The id of the map to rate.
  - `rating` (required): The rating to give the map.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map/rate?mapId=65680d250505420b42427a82&rating=5
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Import Map
- **Endpoint:** `/map/import`
- **Method:** PUT
- **Parameters:**
  - `mapId` (required): The id of the map to import.
  - `objectId` (required): The id of the map to import.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map/import?mapId=65680d250505420b42427a82&objectId=65680d250505420b42427a82
    ```
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Delete Map
- **Endpoint:** `/map`
- **Method:** DELETE
- **Parameters:**
  - `mapId` (required): The id of the map to delete.
- **Example Request:**
    ```
    DELETE https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?mapId=65680d250505420b42427a82
    ```
- **Example Response:**
    ```json
    {
            "_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingCount": 0,
            "comments": [],
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

### Message Endpoints

#### Get Message
- **Endpoint:** `/message`
- **Method:** GET
- **Parameters:**
  - `messageId` (required): The id of the message to retrieve.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/message?messageId=65680d250505420b42427a82
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "content": "This is a test message",
        "sentBy": "auth0|656669d317b4bdb501178567",
        "sentTo": "auth0|656669d317b4bdb501178567",
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Create Message
- **Endpoint:** `/message`
- **Method:** POST
- **Parameters:**
  - `senderId` (required): The id of the user who created the message.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/message?senderId=auth0|656669d317b4bdb501178567
    ```
- **Example Payload:**
    ```json
    {
        "receiverId": "auth0|656669d317b4bdb501178567",
        "subject": "test subject",
        "content": "This is a test message"
    }
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "senderId": "auth0|656669d317b4bdb501178567",
        "receiverId": "auth0|656669d317b4bdb501178567",
        "subject": "test subject",
        "content": "This is a test message",
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Read/Unread Message
- **Endpoint:** `/message/read`
- **Method:** PUT
- **Parameters:**
  - `messageId` (required): The id of the message to mark as read/unread.
  - `read` (required): Boolean value indicating whether to mark as read or unread.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/message/read?messageId=65680d250505420b42427a82&read=true
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "senderId": "auth0|656669d317b4bdb501178567",
        "receiverId": "auth0|656669d317b4bdb501178567",
        "subject": "test subject",
        "content": "This is a test message",
        "read": true,
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-12-01T04:20:20.244Z"
    }
    ```

#### Delete Message
- **Endpoint:** `/message`
- **Method:** DELETE
- **Parameters:**
  - `messageId` (required): The id of the message to delete.
- **Example Request:**
    ```
    DELETE https://zaunmap-6b1455b08c9b.herokuapp.com/api/message?messageId=65680d250505420b42427a82
    ```

### User Endpoints

#### Get User
- **Endpoint:** `/user`
- **Method:** GET
- **Parameters:**
  - `userId` (required): The id of the user to retrieve.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/user?userId=auth0|656669d317b4bdb501178567
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "role": "user",
        "maps": [
            "65680d250505420b42427a82"
        ],
        "following": [],
        "followers": [],
        "blocked": [],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Search Users
- **Endpoint:** `/user/search`
- **Method:** GET
- **parameters:**
  - `name` (optional): The name of the user to search for.
  - `sortBy` & `sortOrder` (optional): The field to sort by and the order to sort by.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/user/search?name=testuser&sortBy=name&sortOrder=asc
    ```
- **Example Response:**
    ```json
    {
        "users": ["auth0|656669d317b4bdb501178567", "auth0|656669d317b4bdb501178568"]
    }
    ```

#### Create User
- **Endpoint:** `/user`
- **Method:** POST
- **Example Payload:**
    ```json
    {
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "picture": "https://s.gravatar.com/avatar/656669d317b4bdb501178567?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png"
    }
    ```
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/user?userId=auth0|656669d317b4bdb501178567
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "role": "user",
        "maps": [],
        "following": [],
        "followers": [],
        "blocked": [],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Rename User
- **Endpoint:** `/user/rename`
- **Method:** PUT
- **Parameters:**
  - `newName` (required): The new name of the user.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/user/rename?newName=testuser2
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser2",
        "role": "user",
        "maps": [],
        "following": [],
        "followers": [],
        "blocked": [],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-12-01T04:20:20.244Z"
    }
    ```

#### Follow/Unfollow User
- **Endpoint:** `/user/follow`
- **Method:** PUT
- **Parameters:**
  - `followId` (required): The id of the user to follow.
  - `follow` (required): Boolean value indicating whether to follow or unfollow.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/follow?followId=auth0|656669d317b4bdb501178567&follow=true
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "role": "user",
        "maps": [],
        "following": [
            "auth0|656669d317b4bdb501178567"
        ],
        "followers": [],
        "blocked": [],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Block/Unblock User
- **Endpoint:** `/user/block`
- **Method:** PUT
- **Parameters:**
  - `blockId` (required): The id of the user to block.
  - `block` (required): Boolean value indicating whether to block or unblock.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/block?blockId=auth0|656669d317b4bdb501178567&block=true
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "role": "user",
        "maps": [],
        "following": [],
        "followers": [],
        "blocked": [
            "auth0|656669d317b4bdb501178567"
        ],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-11-30T04:20:20.244Z"
    }
    ```

#### Change User Role
- **Endpoint:** `/user/role`
- **Method:** PUT
- **Parameters:**
  - `userId` (required): The id of the user to disable.
  - `newRole` (required): The new role of the user.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/role?userId=auth0|656669d317b4bdb501178567&newRole=restricted
    ```
- **Example Response:**
    ```json
    {
        "_id": "65680d250505420b42427a82",
        "userId": "auth0|656669d317b4bdb501178567",
        "name": "testuser",
        "role": "user",
        "maps": [],
        "following": [],
        "followers": [],
        "blocked": [],
        "messagesReceived": [],
        "createdAt": "2023-11-30T04:18:45.285Z",
        "updatedAt": "2023-12-01T04:20:20.244Z"
    }
    ```

#### Delete User
- **Endpoint:** `/user`
- **Method:** DELETE
- **Parameters:**
  - `userId` (required): The id of the user to delete.
- **Example Request:**
    ```
    DELETE https://zaunmap-6b1455b08c9b.herokuapp.com/api/user?userId=auth0|656669d317b4bdb501178567
    ```

## Error Handling
ZaunMap Backend API uses standard HTTP response codes to indicate the success or failure of an API request.
