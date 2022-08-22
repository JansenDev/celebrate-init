import express, { ErrorRequestHandler } from "express";
import { Joi, celebrate, Segments, isCelebrateError } from "celebrate";
import BodyParser from "body-parser";

const app = express()
const PORT = process.env.PORT || 3000

app.use(BodyParser.json())

app.get('/', (res, req, next) => {
    req.send({ message: "hello wolrd" })
})

const schemaLogin = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        age: Joi.number().integer(),
        valid: Joi.object({
            isNumeric: Joi.boolean()
        }),
        more: Joi.string().trim(),
    })
}
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



const errorhanlder: ErrorRequestHandler = (err, req, res, next) => {
    console.log(JSON.stringify(err));
    console.log(err);
    if (isCelebrateError(err)) {
        console.log('====================================');
        console.log(JSON.stringify(err.details));

        let x = '';
        err.details.forEach((v, k) => {
            x = k
        })
        const y = err.details.get(x)
        console.log("y: " + y);

        console.log("X: " + x);


        return res.send({ err, message: y, details: err.details.get(x) })
        console.log('====================================');
    }
    // console.log(isCelebrateError(err));
    // console.log(err.joi);
    // console.log(err.meta);

    res.send({ message: err.message, err })
}
app.use(errorhanlder)



app.listen(PORT, () => console.log(`http://localhost:3000`)
)