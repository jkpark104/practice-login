export interface SignInFormSchema {
  userid: "";
  password: "";
}

export interface SignUpFormSchema extends SignInFormSchema {
  username: "";
  "confirm-password": "";
}

export const SIGNIN = "SIGNIN" as const;

export const SIGNUP = "SIGNUP" as const;
