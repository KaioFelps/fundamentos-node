import fs from "node:fs/promises"
// se for usar streamig precisa ser o node fs tradicional

const databasePath = new URL("../db.json" /* cria sempre um diretorio antes do src, que é onde está a base. */, import.meta.url /* caminho relativo, retorna o path até esse arquivo */)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, "utf8")
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
              this.#persist()  
            })
    } // é executado assim que essa classe for instanciada

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        if(search) {
            const searchObjectParsedToArray = Object.entries(search)
            // {name: "kaio", email: "kaio"}
            // [ [ 'name', 'kaio' ], [ 'email', 'kaio' ] ]

            data = data.filter(row => {
                return searchObjectParsedToArray.some(([key, value]) => {
                    return row[key.toLowerCase()].includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        }
        else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1) {
            this.#database[table][rowIndex] = {...data, id}
            this.#persist
        }
    }
}