const router = require('express').Router();
const { getThoughts, newThought, getOneThought, updateThought, deleteThought, newReaction, deleteReaction } = require('../../controllers/thoughtCont');


router.route('/').get(getThoughts).post(newThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(newReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;