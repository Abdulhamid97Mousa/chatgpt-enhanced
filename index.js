const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-tqGGXvERE6z05szfHgOF2WOg",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080;

app.listen(port, () =>
  console.log(`listening on port ${port}`)
);

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message)
    const body = {
                "model": "text-davinci-003",
                "prompt": `${message}`,
                "max_tokens": 1024,
                "temperature": 0.5
            }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer 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`
        }
    }

    const response = await openai.createCompletion({body, options});


    res.json({
        // data: response.data
        message: response.data.choices[0].text,
    })
});




// create a simple express api that calls the function above