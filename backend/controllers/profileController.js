import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
const myProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('User', ['name'])

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// @route   POST api/profile
// @desc    Create or Update a user profile
// @access  Private
const createUpdateProfile = async (req, res) => {
    const {course, branch, year, image,  hobbies, bio} = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(course) profileFields.course = course
    if(branch) profileFields.branch = branch
    if(year) profileFields.year = year
    if(image) profileFields.image = image
    if(hobbies) profileFields.hobbies = hobbies
    if(bio) profileFields.bio = bio

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if(profile) {
            // Update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, { $set: profileFields}, {new: true})

            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)

        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
} 



// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
const getProfileByID = async (req, res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name'])
        
        if(!profile) return res.status(400).json({msg: 'Profile not found'})

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
} 


// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
const deleteProfile = async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({user: req.user.id})
        // Remove user
        await User.findOneAndRemove({_id: req.user.id})
        
        res.json({msg: 'User deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

export {myProfile, createUpdateProfile, getProfiles, getProfileByID, deleteProfile}