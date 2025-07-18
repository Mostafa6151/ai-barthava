import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';
import {createOpenAI, openai} from '@ai-sdk/openai'
import {ImageModelV2} from "@ai-sdk/provider";


const backend = createOpenAI({
  apiKey: "api-key",
  baseURL: 'http://172.20.10.12:3000/chat/stream',
})

const originalModel = backend.image('dall-e-3') as ImageModelV2;

const imageModel: ImageModelV2 = {
  ...originalModel,
  maxImagesPerCall: 1,
};


// export const myProvider = isTestEnvironment
//     ? customProvider({
//       languageModels: {
//         'chat-model': chatModel,
//         'chat-model-reasoning': reasoningModel,
//         'title-model': titleModel,
//         'artifact-model': artifactModel,
//       },
//     })
//     : customProvider({
//       languageModels: {
//         'chat-model': backend.chat('backend-chat-model'),
//         'chat-model-reasoning': wrapLanguageModel({
//           model: backend.chat('backend-reasoning-model'),
//           middleware: extractReasoningMiddleware({ tagName: 'think' }),
//         }),
//         'title-model': backend.chat('backend-title-model'),
//         'artifact-model': backend.chat('backend-artifact-model'),
//       },
//       imageModels: {
//         'small-model': imageModel,
//       },
//     });
//

// export const myProvider = isTestEnvironment
//   ? customProvider({
//       languageModels: {
//         'chat-model': chatModel,
//         'chat-model-reasoning': reasoningModel,
//         'title-model': titleModel,
//         'artifact-model': artifactModel,
//       },
//     })
//   : customProvider({
//       languageModels: {
//         'chat-model': xai('grok-2-vision-1212'),
//         'chat-model-reasoning': wrapLanguageModel({
//           model: xai('grok-3-mini-beta'),
//           middleware: extractReasoningMiddleware({ tagName: 'think' }),
//         }),
//         'title-model': xai('grok-2-1212'),
//         'artifact-model': xai('grok-2-1212'),
//       },
//       imageModels: {
//         'small-model': xai.imageModel('grok-2-image'),
//       },
//     });


export const myProvider = isTestEnvironment
    ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
    : customProvider({
      languageModels: {
        'chat-model': openai('gpt-4o'),
        'chat-model-reasoning': wrapLanguageModel({
          model: openai('gpt-4o'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai('gpt-3.5-turbo'),
        'artifact-model': openai('gpt-3.5-turbo'),
      },
      imageModels: {
        // فقط در صورت نیاز اضافه شود
        'small-model': openai.imageModel('dall-e-3'),
      },
    });