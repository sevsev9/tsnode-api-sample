db.createUser({
    user: "api",
    pwd: "SecureAPIPassword!",
    roles: [{
        role: "readWrite",
        db: "api"
    }]
})