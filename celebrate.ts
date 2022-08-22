import express, { ErrorRequestHandler } from "express";
import { celebrate, Segments, isCelebrateError } from "celebrate";
import BodyParser from "body-parser";
import { BODY_ESQUEMA } from "./esquema";
import { errorhanlder } from "./errorHandler";

const app = express()
const PORT = process.env.PORT || 3000

app.use(BodyParser.json())

app.get('/', (res, req, next) => {
    req.send({ message: "hello wolrd" })
})

const schemaLogin = {
    [Segments.BODY]: BODY_ESQUEMA
}

console.log("mas logs");


console.log("Creando cambios");


const loginValidator = (req: any, res: any, next: any) => celebrate(schemaLogin)(req, res, next)
const loginValidator2 = () => celebrate(schemaLogin)

app.post('/', loginValidator, (req, res, next) => {
    const body = req.body
    res.send(body)
})


app.use((req, res, next) => {
    res.send({ message: "Not found", status: 404 })
})



app.use(errorhanlder)



app.listen(PORT, () => console.log(`http://localhost:3000`)
)