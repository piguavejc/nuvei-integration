import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NUVEI_ENV: z.string().nonempty(),
  NUVEI_APPLICATION_CODE: z.string().nonempty(),
  NUVEI_APPLICATION_KEY: z.string().nonempty(),
});

type Environment = z.infer<typeof envSchema>;

const validateEnv = (): Environment => {
  const result = envSchema.safeParse({
    NUVEI_ENV: process.env.NEXT_PUBLIC_NUVEI_ENV,
    NUVEI_APPLICATION_CODE: process.env.NEXT_PUBLIC_NUVEI_APPLICATION_CODE,
    NUVEI_APPLICATION_KEY: process.env.NEXT_PUBLIC_NUVEI_APPLICATION_KEY,
  });

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }

  return result.data;
};

const environment = validateEnv();
export default environment;
