import http from "node:http"
import { Database } from "./database.js"
import { json } from "./middlewares/json.js"
import {randomUUID} from "node:crypto"

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { url, method } = req
    await json(req, res)

    if (url === "/users" && method === "GET") {
        const users = database.select("users")

        return res
            .setHeader("Content-type", "application/json")
            .end(JSON.stringify(
            {
                users
            }
        ))
    }

    if (url === "/users" && method === "POST") {
        const { name, email } = req.body
        const newUser = {
            name,
            email,
            id: randomUUID()
        }

        database.insert("users", newUser)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)