import app from "../src/app";

//********** App **********//
const port = process.env.PORT || 5500;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
export default app;
