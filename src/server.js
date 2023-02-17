import http from "node:http"

const users = []

const server = http.createServer((req, res) => {
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
        console.log(req)
        users.push({
            nome: "John Doe",
            email: "johndoe@example.com",
            id: 1,
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)