import { ErrorRequestHandler } from "express"
import { config } from "../../../../config/config"

/**
 * 500 response & log when errors are raised.
 */
const errorHandler: ErrorRequestHandler = (err, _req, res) => {
	console.log(err)
	return res.status(400).json({
		status: 400,
		message: "error",
		error: {
			title: "Bad Request",
			detail: "Please check your request, or contact support"
		},
		api: { version: config.version }
	})
}

// Spanish: En este caso usamos codigo de estado 400, mitigando el escaneo de errores por los desarrolladores o atacantes y evitando que el usuario vea el error.

// English: We use 400 code, mitigating the scan of errors by the developers or attackers and preventing the user from seeing the error.
export default errorHandler
