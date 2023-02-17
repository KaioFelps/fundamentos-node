import { Readable, Writable, Transform } from "node:stream"

class OneToHundredStreams extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(`${buf}\r\n`) // push é o modo de enviar de volta algo da read
            }
        }, 100)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        const bufferedTransformed = Buffer.from(String(transformed))
        
        callback(null, bufferedTransformed)
        // params: erro | null, resultado
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        // chunk => pedaço que a gente leu na stream de leitura (o que é enviado no this.push, tudo que é enviado lá é um chunk)
        // encoding => como está codificada
        // callback => função que precisa chamar quando terminar de executar a sua função (o que devia fazer)
        // não retornamos NADA num writable, ela não transforma nada (tipo diferente de stream), ela apenas processa o dado
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStreams()
    .pipe(new InverseNumberStream()) // sempre fica no meio, pois precisa obrigatóriament ler de algum lugar e escrever para algum lugar
    .pipe(new MultiplyByTenStream())