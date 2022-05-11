import {
  FormEvent,
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import { SIGNIN, SIGNUP, SignInFormSchema, SignUpFormSchema } from "@/types";
import {
  signInFormValidation,
  signUpFormValidation,
  SignUpFormValidation,
} from "@/utils";

import Input from "@/components/input/input";
import styles from "./form.module.css";

function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  type FormType = typeof SIGNIN | typeof SIGNUP;

  const [formType, setFormType] = useState<FormType>(SIGNIN);

  const validationSchema =
    formType === SIGNIN ? signInFormValidation : signUpFormValidation;

  type FormSchema = SignInFormSchema | SignUpFormSchema;

  const [inputValue, setInputValue] = useState<FormSchema>({
    userid: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useLayoutEffect(() => {
    if (formType === SIGNIN) return;

    setInputValue({
      userid: "",
      password: "",
      username: "",
      "confirm-password": "",
    });
  }, [formType]);

  useLayoutEffect(() => {
    setInputValue((prevState) => {
      const nextState: FormSchema = {
        ...prevState,
      };

      Object.keys(nextState).forEach((key) => {
        nextState[key as keyof typeof nextState] = "";
      });

      return nextState;
    });

    Object.keys(validationSchema).forEach((key) => {
      const schemaKey = key as keyof typeof validationSchema;

      if (schemaKey === "isValid") return;

      validationSchema[schemaKey].value = "";
    });
  }, [formType, validationSchema]);

  useEffect(() => {
    setButtonDisabled(!validationSchema.isValid);
  }, [validationSchema.isValid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLFormElement;

    if (!Object.keys(validationSchema).includes(name)) return;

    const schemaKey = name as keyof typeof validationSchema;

    if (schemaKey === "isValid") return;

    validationSchema[schemaKey].value = value.trim();
  };

  return (
    <form
      className={classNames(styles.form, formType)}
      ref={formRef}
      noValidate
      onChange={handleFormChange}
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <div className={styles.title}>
        {formType === SIGNIN ? "SIGN IN" : "SIGN UP"}
      </div>
      <Input
        onChange={handleChange}
        formType={formType}
        inputType="email"
        value={inputValue.userid ?? ""}
        isValid={validationSchema.userid.isValid}
      />
      {formType === SIGNUP && <div className="error-message" />}
      {formType === SIGNUP &&
        "username" in inputValue &&
        "username" in validationSchema && (
          <Input
            onChange={handleChange}
            formType={formType}
            inputType="name"
            value={inputValue.username ?? ""}
            isValid={
              (validationSchema as SignUpFormValidation).username.isValid
            }
          />
        )}
      <Input
        onChange={handleChange}
        formType={formType}
        inputType="password"
        value={inputValue.password ?? ""}
        isValid={validationSchema.password.isValid}
      />
      {formType === SIGNUP &&
        "username" in inputValue &&
        "username" in validationSchema && (
          <Input
            onChange={handleChange}
            formType={formType}
            inputType="confirm-password"
            value={inputValue["confirm-password"] ?? ""}
            isValid={
              (validationSchema as SignUpFormValidation)["confirm-password"]
                .isValid
            }
          />
        )}
      <button
        type="submit"
        className={classNames(styles.button, formType)}
        disabled={buttonDisabled}>
        {formType === SIGNIN ? "SIGN IN" : "SIGN UP"}
      </button>
      <div className={styles.link}>
        {formType === SIGNIN ? "Not a member? " : "Already a member? "}
        <button
          type="button"
          onClick={() => {
            setFormType(formType === SIGNIN ? SIGNUP : SIGNIN);
          }}>
          {formType === SIGNIN ? "Sign up now" : "Sign in"}
        </button>
      </div>
    </form>
  );
}

export default Form;
