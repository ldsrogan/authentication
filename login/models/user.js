import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
})

userSchema.pre('save', function (next) {
    const usr = this;
    if (!usr.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(usr.password, salt, null, (err, hash) => {
            if(err) {
                return next(err);
            }
            usr.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

mongoose.model('User', userSchema);