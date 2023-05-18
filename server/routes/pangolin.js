const router = require('express').Router();
let Pangolin = require('../models/pangolin.model');

router.route('/inscription').post((req, res) => {
    const { name, role, email, password } = req.body;
    const newPangolin = new Pangolin({ name, role, email, password });

    newPangolin.save()
        .then(() => res.json('Pangolin added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.post('/connexion', (req, res) => {
    const { email, password } = req.body;
  
    Pangolin.findOne({ email, password })
        .then((user) => {
            if (user) {
                res.json({ message: 'User found', user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/allUsers/:id', async (req, res) => {
    try {
        const user = await Pangolin.findById(req.params.id);
        if (!user) {
            return res.status(404).json('User not found');
        }
      
        const friends = user.friends || [];
      
        const users = await Pangolin.find({ 
            _id: { 
                $ne: user._id,         // Exclude the current user
                $nin: friends.map(friend => friend._id)  // Exclude users in friends list
            } 
        });
      
        res.json(users);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/user/:id').get((req, res) => {
    Pangolin.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err=> res.status(400).json('Error: ' + err))
});

router.post('/update/:id', async (req, res) => {
    try {
        const pangolin = await Pangolin.findById(req.params.id).populate('friends');
        if (!pangolin) {
            return res.status(404).json('Pangolin not found');
        }

        pangolin.role = req.body.role;
        pangolin.friends = req.body.friends.map(friend => new Pangolin(friend));
      
        await pangolin.save();
      
        res.json('Pangolin updated!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;