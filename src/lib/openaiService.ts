import OpenAI from 'openai';

// Ensure you have OPENAI_API_KEY set in your .env.local or environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example function 1: Get a completion
export async function getOpenAICompletion(prompt: string): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not configured. Skipping OpenAI call.');
    return 'OpenAI not configured.'; // Return a placeholder or null
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or your preferred model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    return completion.choices[0]?.message?.content?.trim() ?? null;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Handle error appropriately - maybe throw, return null, or a specific error message
    return 'Error communicating with OpenAI.';
  }
}

// Example function 2: Placeholder for another AI feature
export async function analyzeSentiment(text: string): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not configured.');
    return 'Sentiment analysis requires OpenAI configuration.';
  }

  // Replace with actual implementation using OpenAI or another library
  console.log('Analyzing sentiment for:', text);
  // const prompt = `Analyze the sentiment of the following text: "${text}". Respond with only POSITIVE, NEGATIVE, or NEUTRAL.`;
  // return await getOpenAICompletion(prompt);
  return 'NEUTRAL'; // Placeholder
}

// Add more specific OpenAI functions as needed for your application features 