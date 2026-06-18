import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateQuestions(role) {
  try {
    console.log("===== GENERATING QUESTIONS =====");
    console.log("Role:", role);
    console.log("API Key exists:", !!API_KEY);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate exactly 5 interview questions for a ${role}. Return only the questions, one per line.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SUCCESS:");
    console.log(response.data);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("===== OPENROUTER ERROR =====");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error);
    }

    throw error;
  }
}

export async function evaluateAnswers(answers) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
Evaluate these interview answers:

${answers.join("\n")}

Return ONLY valid JSON in this exact format:

{
  "communicationScore":80,
  "technicalScore":75,
  "confidenceScore":82,
  "overallScore":79,
  "feedback":"Short feedback"
}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Evaluation Error:", error);

    if (error.response) {
      console.error(error.response.data);
    }

    throw error;
  }
}