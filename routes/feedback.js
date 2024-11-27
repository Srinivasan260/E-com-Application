const express = require('express');
const Feedback = require('../modules/schemas/feedbackschema');
const router = express.Router();

const authenticate = require('../middleware/middleware')

router.use(authenticate)

// Example of a simple logger middleware

// Create Feedback
router.post('/', async (req, res) => {
  const { user, product, feedback, rating } = req.body;
  const newFeedback = new Feedback({ user, product, feedback, rating });
  await newFeedback.save();
  res.status(201).json(newFeedback);
});

// Get Feedback
router.get('/:userId', async (req, res) => {
  const { userId } = req.params 
  console.log(userId)
  try{
    const feedbacks = await Feedback.find({ user : userId }).populate('user').populate('product');

    if(!feedbacks.length){
      return res.status(404).json({ message: 'No feeback found .' });
    }
    res.json(feedbacks);

  }catch(err){
    console.log(err);
    res.status(500).json({message : err.message})
  }

});

// Update Feedback
router.put('/:id', async (req, res) => {
  const { feedback, rating } = req.body;
  const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, { feedback, rating }, { new: true });
  res.json(updatedFeedback);
});

// Delete Feedback
router.delete('/:id', async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Feedback deleted' });
});

module.exports = router;
