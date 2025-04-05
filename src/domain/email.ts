export interface EmailEnv {
  readonly mailer: {
    readonly send: (email: Email) => Promise<void>;
  };
}

interface Email {
  readonly to: string;
  readonly body: string;
}
