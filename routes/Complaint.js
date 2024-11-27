const express = require('express');
const Complaint = require('../modules/schemas/complaintschema');
const router = express.Router();
const authenticate = require('../middleware/middleware')

router.use(authenticate)



// Create Complaint
router.post('/', async (req, res) => {
  const { user, product, description } = req.body;
  console.log(req.body);
  const newComplaint = new Complaint({ user, product, description });
  await newComplaint.save();
  res.status(201).json(newComplaint);
});

// Get Complaints
router.get('/:userId', async (req, res) => {
  const { userId } = req.params; // Extract userId from the route parameter

  try {

    console.log(userId)
    // Find complaints where the user matches the provided userId
    const complaints = await Complaint.find({ user: userId })
      .populate('user') // Populate user details
      .populate('product'); // Populate product details
    
      console.log(complaints)
    if (!complaints.length) {
      return res.status(404).json({ message: 'No complaints found for this user.' });
    }

    res.json(complaints); // Send the complaints as a response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});



// Update Complaint
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updatedComplaint);
});

// Delete Complaint
router.delete('/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Complaint deleted' });
});

module.exports = router;
