const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  let text = "safe, you're in wwr-backend";
  console.log(text);
  res.send(text);
});

app.post("/predict", async (req, res) => {
  try {
    const data = req.body.input_data;

    // Include authenticity check in the prompt
    const prompt = `Check whether the given content " ${data} " is fake or genuine. If it is fake, output CG; otherwise, output OG. Remember that you have to output a single word only`;

    // Make a request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: generatedText,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
