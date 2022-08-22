import { isCelebrateError } from "celebrate";
import { ErrorRequestHandler } from "express";

export const errorhanlder: ErrorRequestHandler = (err, req, res, next) => {
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