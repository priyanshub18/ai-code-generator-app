import Constants from "@/data/Constants";
import { constants } from "buffer";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_AI_API_KEY,
});
export async function POST(req: NextRequest) {
  const { model, description, imageUrl } = await req.json();
  const modelname = Constants.AiModelList.find((item) => item.modelName === model)?.modelName;
  if (!modelname) {
    return new Response("Model not found", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelname ?? "google/gemini-2.0-pro-exp-02-05:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: description,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    }),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // @ts-ignore
      for await (const chunk of response) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset= utf-8",
      Connection: "keep-alive",
    },
  });
}
