
const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userCont');


router.route('/')
    .get(getUsers)
    .post(newUser) 


router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);


router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;