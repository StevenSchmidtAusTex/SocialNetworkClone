const { Schema, model } = require('mongoose');

// schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Enter a valid email address.']
        },
        thoughtss: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// 
userSchema.virtual('friendNumber').get(function() {
    return this.friends.length;
}); 

const User = model('User', userSchema);

module.exports = User;