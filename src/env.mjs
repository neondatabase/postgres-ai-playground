import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
    /*
     * Serverside Environment variables, not available on the client.
     * Will throw if you access these variables on the client.
     */
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']),

        OPENAI_API_KEY: z.string().startsWith('sk-'),

        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    },
    /*
     * Environment variables available on the client (and server).
     *
     * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
     */
    client: {
        NEXT_PUBLIC_APP_URL: z.string().url(),
    },
    /*
     * Due to how Next.js bundles environment variables on Edge and Client,
     * we need to manually destructure them to make sure all are included in bundle.
     *
     * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,

        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
     * This is especially useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})