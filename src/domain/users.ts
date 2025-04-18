import { EmailEnv } from './email.ts';
import { LoggerEnv } from './logger.ts';

// UserEnv contains all the ports needed by the user domain functions.
export interface UserEnv {
  readonly userRepository: {
    readonly insert: (definition: UserDefinition) => Promise<User>;
  };
}

export interface User {
  // Using a branded type is good practice, but string for simplicity here
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  // the email is string for simplicity
  readonly email: string;
  readonly age: number;
}

export type UserDefinition = Omit<User, 'id'>;

// This is a domain function (acting as the use case) that, given the required environment (ports)
// and a user definition, registers a user.
export const registerUser =
  (definition: UserDefinition) =>
  // It requires an environment that satisfies UserEnv, EmailEnv and LoggerEnv
  async (env: UserEnv & EmailEnv & LoggerEnv): Promise<User> => {
    // Persist the user using the repository port
    // Error handling omitted for brevity
    const user = await env.userRepository.insert(definition);
    env.logger.log(`User inserted with ID: ${user.id}`);

    // Send a welcome email using the mailer port
    const email = { to: user.email, body: `Welcome, ${user.firstName}!` };
    // eslint-disable-next-line functional/no-expression-statements
    await env.mailer.send(email);
    env.logger.log(`Welcome email sent to: ${user.email}`);

    return user;
  };
