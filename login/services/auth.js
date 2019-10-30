import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, email, done) => {
    User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, 'Invalid Credentials'); }
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, 'Invalid credentials.');
        });
    });
}));

async function signup({ username, password, email, req }) {
    const user = new User({ username, password, email });
    if (!username || !email || !password) { throw new Error('You must provide an username, password, and email'); }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('username in use');
    }
    //db save
    const usr = await user.save();
    return new Promise((resolve, reject) => {
        req.logIn(usr, (err) => {
            if (err) {
                reject(err);
            }
            resolve(usr);
        });
    });
}

function login({ username, password, req }) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (!user) { reject('Invalid credentials.'); }

            req.login(user, () => resolve(user));
        })({ body: { username, password } });
    });
}

function logout({ req }) {
    const { user } = req;
    req.logout();
    return user;
}

export default { signup, login, logout }