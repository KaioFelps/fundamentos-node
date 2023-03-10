import { Database } from "./database.js"
import {randomUUID} from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select("users", search ? {
                    name: search,
                    email: search
                } : null)

            return res
                .setHeader("Content-type", "application/json")
                .end(JSON.stringify(
                {
                    users
                }
            ))
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { name, email } = req.body
            const newUser = {
                name,
                email,
                id: randomUUID()
            }
    
            database.insert("users", newUser)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params

            database.delete("users", id)

            return res.writeHead(204).end()
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            if (!name || !email) return res.writeHead(400).end()

            database.update("users", id, {name, email})
            return res.writeHead(204).end()
        }
    }
]