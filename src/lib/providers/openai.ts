import { OpenAI } from "openai";

import { createOpenAI } from '@ai-sdk/openai';

export const openAPI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL:"https://api.aimlapi.com",
  });



export const AIMLAPI = createOpenAI({
    baseURL: 'https://api.aimlapi.com',
    apiKey: process.env.OPENAI_API_KEY,
  });