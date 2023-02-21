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

    select(table) {
        const data = this.#database[table] ?? []
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
}