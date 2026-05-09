const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 4000;
const app = express();
require('dotenv').config();

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
// require("node:dns/promises").setServers(["8.8.8.8", "8.8.4.4"]);


// middleware
app.use(cors());
app.use(express.json());

// ReSmartDeals
// ReSmartDeals0101
const uri = process.env.URI


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        await client.connect();

        const smartDB = client.db("ReSmartDB");
        const productCollection = smartDB.collection("products")



        // ----PRODUCT API----
        app.post("/products", async (req, res) => {
            const productss = req.body;
            const resutl = await productCollection.insertOne(productss);
            res.send(resutl)
        });
        app.get("/products", async (req, res) => {
            const curser = productCollection.find()
            const result = await curser.toArray()
            res.send(result)
        })






        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error


    }
}
run().catch(console.dir);
















app.get("/", (req, res) => {
    res.send("smart surver is running...")
})



app.listen(port, () => {
    console.log(`smart app listening/Running... http://localhost:${port}/`)
})