import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
      },
    hobbies: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile