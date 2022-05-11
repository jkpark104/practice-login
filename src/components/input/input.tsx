import { ChangeEvent } from "react";
import classNames from "classnames";
import { SIGNIN, SIGNUP } from "@/types";
import { replaceFrontLetterToCapital } from "@/utils";

import styles from "./input.module.css";

function Input({
  formType,
  inputType,
  value,
  onChange,
  isValid,
}: {
  formType: typeof SIGNIN | typeof SIGNUP;
  inputType: "email" | "password" | "name" | "confirm-password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}) {
  const getInputNameAttrFrom = (
    type: "email" | "password" | "name" | "confirm-password"
  ) => {
    switch (type) {
      case "email":
        return "userid";
      case "name":
        return "username";
      default:
        return type;
    }
  };

  // console.log({ formType, isValid, inputType });

  return (
    <div className={styles["input-container"]}>
      <input
        type={inputType.match(/password/) ? "password" : "text"}
        id={`${formType}-${inputType === "email" ? "userid" : inputType}`}
        name={getInputNameAttrFrom(inputType)}
        required
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={`${formType}-${inputType === "email" ? "userid" : inputType}`}>
        {replaceFrontLetterToCapital(inputType)}
      </label>
      <span className={styles.bar} />
      {isValid && (
        <i
          className={classNames(
            styles.icon,
            styles["icon-success"],
            "bx bxs-check-circle"
          )}
        />
      )}
      {!isValid && (
        <i
          className={classNames(
            styles.icon,
            styles["icon-error"],
            "bx bxs-x-circle"
          )}
        />
      )}
      <div className={styles.error} />
    </div>
  );
}

export default Input;
