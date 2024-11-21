db.createUser(
    {
        user: "shopper",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "shopperdb"
            }
        ]
    }
);