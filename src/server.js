import http from "node:http"
import { json } from "./middlewares/json.js"

const users = []

const server = http.createServer(async (req, res) => {
    const { url, method } = req

    if (url === "/users" && method === "GET") {
        return res
            .setHeader("Content-type", "application/json")
            .end(JSON.stringify(
            {
                users: users
            }
        ))
    }

    if (url === "/users" && method === "POST") {
        await json(req, res)

        users.push(req.body)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)