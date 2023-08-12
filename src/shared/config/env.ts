import { plainToInstance } from 'class-transformer';
import { IsString, IsNotEmpty, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length) {
  throw new Error(JSON.stringify(errors, null, 4));
}
