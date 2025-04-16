import { local_vars } from "./env/dev";
import { prod_vars } from "./env/prod";

export function GetEnv() {
  return process.env.ENV === "prod" ? "prod" : "dev";
}

export function GetEnvVars(env: string) {
  return env === "prod" ? prod_vars : local_vars;
}
