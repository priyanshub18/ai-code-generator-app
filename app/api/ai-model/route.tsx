// import Constants from "@/data/Constants";
// import { NextRequest } from "next/server";
// import OpenAI from "openai"
// const openai = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_AI_API_KEY,

// })
// export const maxDuration = 300;

// export async function POST(req: NextRequest) {

//     const { model, description, imageUrl } = await req.json();

//     const ModelObj = Constants.AiModelList.find(item => item.name == model)
//     const modelName = ModelObj?.modelName;
//     console.log(modelName);
//     const response = await openai.chat.completions.create({
//         model: modelName ?? 'google/gemini-2.0-pro-exp-02-05:free',
//         stream: true,
//         messages: [
//             {
//                 "role": "user",
//                 "content": [
//                     {
//                         "type": "text",
//                         "text": description
//                     },
//                     {
//                         "type": "image_url",
//                         "image_url": {
//                             "url": imageUrl
//                         }
//                     }
//                 ]
//             }
//         ]
//     });

//     // Create a readable stream to send data in real-time
//     const stream = new ReadableStream({
//         async start(controller) {
//             for await (const chunk of response) {
//                 const text = chunk.choices?.[0]?.delta?.content || "";
//                 controller.enqueue(new TextEncoder().encode(text)); // Send data chunk
//             }
//             controller.close(); // End stream
//         },
//     });

//     return new Response(stream, {
//         headers: {
//             "Content-Type": "text/plain; charset=utf-8",
//         },
//     });

// }

import Constants from "@/data/Constants";
import { constants } from "buffer";
import { log } from "console";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_AI_API_KEY,
});

const AiModelList = [
  {
    name: "Gemini Google",
    icon: "/google.png",
    modelName: "google/gemini-2.0-pro-exp-02-05:free",
  },
  {
    name: "Llama by Meta",
    icon: "/meta.png",
    modelName: "meta-llama/llama-3.2-11b-vision-instruct:free",
  },
  {
    name: "Deep Seek",
    icon: "/deepseek.png",
    modelName: "deepseek/deepseek-r1-distill-llama-8b",
  },
];
export async function POST(req: NextRequest) {
  const { model, description, imageUrl } = await req.json();

  console.log(model);
  console.log(description);
  console.log(imageUrl);
  const modelname = AiModelList.find((item) => item.name === model)?.modelName;

  console.log(modelname);
  if (!modelname) {
    return new Response("Model not found", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const response = await openai.chat.completions.create({
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
    },
  });
}
