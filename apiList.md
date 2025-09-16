# Apis of the project
## Auth router
-POST /signup
-POST /login
-POST /logout

## Profile router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## ConnectionRequest router
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## User router
-GET /connnections
-GET /requests/received
-GET /feed = Gets you the profiles of other users on platform


status : ignored, interestd, accepeted , rejected

Paging in feed page

/feed?page=1&limit=10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 => .skip(10) & .limit(10)
/feed?page=3&limit=10 => .skip(20) & .limit(10)
