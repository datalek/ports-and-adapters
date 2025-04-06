import z from 'zod';

export interface Config {
  readonly server: {
    readonly port: number;
  };
}

const EnvsCodec = z.object({
  SERVER_PORT: z.coerce.number(),
});

export const loadConfigOrThrow = (
  env: Record<string, string | undefined>,
): Config => {
  const envs = EnvsCodec.parse(env);
  return {
    server: { port: envs.SERVER_PORT },
  };
};
