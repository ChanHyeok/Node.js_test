module.exports = function(uid, id, password) {
    this.uid = uid;
    this.id = id;
    this.password = password;

    return {
            uid: this.uid,
            id: this.id,
            password: this.password
        };
};
