const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
            message: props => `${props.value} is not a valid email!`
        },
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        validate: {
            validator: function (v) { return /^[a-zA-Z0-9]+$/.test(v); },
            message: props => `${props.value} must contain only Latin letters and digits!`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [1, 'Password should be at least 1 character'],
        maxlength: [64, 'Password should be at most 64 characters'],
        validate: {
            validator: function (v) { return /^[a-zA-Z0-9]+$/.test(v); },
            message: props => `${props.value} must contain only Latin letters and digits!`
        },
    },
    tasks: [{
        type: ObjectId,
        ref: 'Task',
    }]
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema);