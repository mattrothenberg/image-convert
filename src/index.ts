import app from "./app";

const port = process.env.PORT || 1234;
app.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`Listening: http://localhost:${port}`);
	/* eslint-enable no-console */
});
