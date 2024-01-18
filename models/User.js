const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: true },
});


userSchema.pre('save', async function (next) {
if (!this.isModified('password')) {
    return net();
}
try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
} catch (error) {
    return next(error);
}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
