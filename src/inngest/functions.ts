import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createXai } from "@ai-sdk/xai";

import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openAI = createOpenAI();
const anthropic = createAnthropic();
const xAi = createXai();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  {
    event: "execute/ai",
  },
  async ({ event, step }) => {
    console.log("Hello World");
    console.log("This is a warning");
    console.error("This is a blatant error...");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is the Fear of the Lord",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: openAISteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openAI("gpt-4"),
        system: "You are a helpful assistant.",
        prompt: "What is the Fear of the Lord",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: "You are a helpful assistant.",
        prompt: "What is the Fear of the Lord",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: xAISteps } = await step.ai.wrap(
      "xai-generate-text",
      generateText,
      {
        model: xAi("grok-3"),
        system: "You are a helpful assistant.",
        prompt: "What is the Fear of the Lord",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return {
      geminiSteps,
      openAISteps,
      anthropicSteps,
      xAISteps,
    };
  }
);
