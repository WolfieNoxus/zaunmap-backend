# ZaunMap Backend API Documentation

## Base URL
`https://zaunmap-6b1455b08c9b.herokuapp.com/api`

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
- **Parameters:**
  - `userId` (required): The id of the user who created the comment.
  - `mapId` (required): The id of the map the comment is posted on.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/comment?userId=auth0|656669d317b4bdb501178567&mapId=65680d250505420b42427a82
    ```
- **Example Payload:**
    ```json
    {
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
- **Parameters:**
  - `userId` (required): The id of the user who created the comment.
  - `commentId` (required): The id of the comment to reply to.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/reply?userId=auth0|656669d317b4bdb501178567&commentId=65680d250505420b42427a82
    ```
- **Example Payload:**
    ```json
    {
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
  - `userId` (required): The id of the user who liked the comment.
  - `commentId` (required): The id of the comment to like.
  - `like` (required): Boolean value indicating whether to like or unlike.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/like?userId=auth0|656669d317b4bdb501178567&commentId=65680d250505420b42427a82&like=true
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
  - `userId` (required): The id of the user who disliked the comment.
  - `commentId` (required): The id of the comment to dislike.
  - `dislike` (required): Boolean value indicating whether to dislike or undislike.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/dislike?userId=auth0|656669d317b4bdb501178567&commentId=65680d250505420b42427a82&dislike=true
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
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
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
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
        },
        {
            "_id": "",
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
        }
    ]
    ```

#### Create Map
- **Endpoint:** `/map`
- **Method:** POST
- **Parameters:**
  - `userId` (required): The id of the user who created the map.
- **Example Request:**
    ```
    POST https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?userId=auth0|656669d317b4bdb501178567
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
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
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?mapId=65680d250505420b42427a82&userId=auth0|656669d317b4bdb501178567
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
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Rate Map
- **Endpoint:** `/map/rate`
- **Method:** PUT
- **Parameters:**
  - `userId` (required): The id of the user who rated the map.
  - `mapId` (required): The id of the map to rate.
  - `rating` (required): The rating to give the map.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map/rate?userId=auth0|656669d317b4bdb501178567&mapId=65680d250505420b42427a82&rating=5
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
            "createdAt": "2023-11-30T04:18:45.285Z",
            "updatedAt": "2023-11-30T04:18:45.285Z"
    }
    ```

#### Import Map
- **Endpoint:** `/map/import`
- **Method:** PUT
- **Parameters:**
  - `userId` (required): The id of the user who imported the map.
  - `mapId` (required): The id of the map to import.
  - `object_id` (required): The id of the map to import.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/map/import?userId=auth0|656669d317b4bdb501178567&mapId=65680d250505420b42427a82&object_id=65680d250505420b42427a82
    ```
- **Example Response**
    ```json
    {
            "_id": "",
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
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
    DELETE https://zaunmap-6b1455b08c9b.herokuapp.com/api/map?mapId=65680d250505420b42427a82&userId=auth0|656669d317b4bdb501178567
    ```
- **Example Response:**
    ```json
    {
            "_id": "",
            "map_id": "",
            "name": "",
            "owner": "",
            "isPublic": true,
            "objectId": "",
            "tags": [],
            "description": "",
            "ratings": [],
            "averageRating": 0,
            "ratingsCount": 0,
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
  - `role` (optional): The role of the user to search for.
  - `sortBy` & `sortOrder` (optional): The field to sort by and the order to sort by.
- **Example Request:**
    ```
    GET https://zaunmap-6b1455b08c9b.herokuapp.com/api/user/search?name=testuser&role=user&sortBy=name&sortOrder=asc
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
- **Parameters:**
  - `userId` (required): The id of the user to create.
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
  - `userId` (required): The id of the user to rename.
  - `newName` (required): The new name of the user.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/user/rename?userId=auth0|656669d317b4bdb501178567&newName=testuser2
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
  - `userId` (required): The id of the user who is following.
  - `followId` (required): The id of the user to follow.
  - `follow` (required): Boolean value indicating whether to follow or unfollow.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/follow?userId=auth0|656669d317b4bdb501178567&followId=auth0|656669d317b4bdb501178567&follow=true
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
  - `userId` (required): The id of the user who is blocking.
  - `blockId` (required): The id of the user to block.
  - `block` (required): Boolean value indicating whether to block or unblock.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/block?userId=auth0|656669d317b4bdb501178567&blockId=auth0|656669d317b4bdb501178567&block=true
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
  - 'newRole' (required): The new role of the user.
- **Example Request:**
    ```
    PUT https://zaunmap-6b1455b08c9b.herokuapp.com/api/disable?userId=auth0|656669d317b4bdb501178567&newRole=restricted
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
