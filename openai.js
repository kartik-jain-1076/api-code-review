import { Configuration, OpenAIApi } from "openai";
import * as fs from "fs";

// Config OpenAI API.
const configuration = new Configuration({
  apiKey: "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",
});

//OpenAI Instance Created
const OpenAI = new OpenAIApi(configuration);

// Define a function to get a response from the OpenAI API.
const getReviewComments = async (code) => {
  console.log(`${green}Wait and relax while I am Reviewing your code!\n`);
  const prompt = `Review the code below and provide feedback on how to improve it.
  ${code}
  `;
  const completion = await OpenAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  const review = completion.data?.choices[0]?.message?.content;
  return review;
};

// Setting color codes
const reset = "\x1b[0m";
const green = "\x1b[32m";

// Get the file path from the command line.
const filePath = process.argv[2];
if (!filePath) {
  console.error("Please provide a file path.");
  process.exit(1);
}

// Read the file and get the code.
const code = fs.readFileSync(filePath, "utf-8");

// Get a response from OpenAI API and provide review comments.
getReviewComments(code)
  .then((response) => {
    console.log(
      `${green}Review ${filePath} ---: ${reset}\n${response}${reset}\n`
    );
  })
  .catch((error) => {
    console.error(error);
  });
