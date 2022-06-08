
![Logo](https://i.postimg.cc/qqJDvNYN/JSONG-Banner.jpg)


# Jsong Rest API :-



JSONG rest API for getting/posting details of some songs/artists. It has login/logout functionalities for the user from the token, which is generated using JWT(JSONWEBTOKEN). User Can add Songs/Artists to the database. Users can rate songs & the average rating of the song changes accordingly after any changes in the rating of a piece. The Artist's rating of that particular song is also updated automatically based on his song's ratings.


## Tech Stack

- **Node**

- **Express**

- **MongoDB** (For Storage)

- **Heroku** (For Deployment)


## API Reference

#### API Link:- https://jsong-backend.herokuapp.com


#### Get songs

```http
  GET /api/songs/
```


#### Get Artists

```http
  GET /api/artists/
```


#### Create a Artist

```http
  POST /api/artists/
```


| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`|`string`|**Required** (Should Be Unique)|
| `dob ` | `string/date` | **Required**. (Date of Birth of Artist)|
| `bio`  | `string` | **Required** (Information About Artist) |


#### Create a Songs

```http
  POST /api/songs/
```


| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`|`string`|**Required** (Should be Unique)|
| `dor ` | `string/date` | **Required**. (Date of released of song) |
| `cover`  | `string` | **Required** (Cover Image Link ogf song) |
| `SpotifyUrl`  | `string` | **Required** (real Spotify Url of song) |
| `Artist[ ArtistIds ]`  | `string` | **Required** (Can be collab so, can pass muiltple artist Ids) |


#### Get Songs By Selected Artist

```http
  POST /api/artists/songs/:ArtistId
```
| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ArtistId`|`string`|**Required**|

#### Rate A Song


```http
  POST /api/songs/
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID`|`string`|**Required** |
| `SongID` | `string/date` | **Required**.|
| `rating`  | `string/Number` | **Required** |


#### Register

```http
  POST /register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`|`string`|**Required**|
| `email` | `string` | **Required**. Email should be Unique |
| `password`  | `string` | **Required** (No password specification as such) |

#### Login

```http
  POST /login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `password`  | `string` | **Required** |


#### Get(Logged In) User.

```http
  POST /token
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authentication Token`|`string`|**Required** (which need to be get the user detail)|




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB`: MongoDB database Link.

`KEY`: JSONWEBTOKEN key for hashing that password. 

`PORT`: Which is given by Heroku.


## Limitation

No Authentication / Validations Added as such.
