const { Configuration, OpenAIApi } = require("openai")
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-tqGGXvERE6z05szfHgOF2WOg",
    apiKey: "",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = 3080


app.post('/', async (req, res) => {
  const { message} = req.body;
  console.log(message, "message")

  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${message}`,
  max_tokens: 1024,
  temperature: 0.0,
  },{
  proxy:{
    host: "127.0.0.1",
    port: 7890
  }});
  res.json({
    message: response.data.choices[0].text,
  })

});

// app.get('/models', async (req, res) => {
//   const response = await openai.listEngines();
//   console.log(response.data.data)
//   res.json({
//     models: response.data.data
//   })
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});