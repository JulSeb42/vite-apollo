/*=============================================== Connect to MongoDb ===============================================*/

import mongoose from "mongoose"

import { MONGODB_URI } from "../utils"

mongoose
    .connect(MONGODB_URI)
    .then(res =>
        console.log(
            `🎉 Connected to MongoDb! Database name: ${res.connections[0].name}`
        )
    )
    .catch(err => console.log(err))
