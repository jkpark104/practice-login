export const getFormData = ($form: HTMLFormElement) =>
  Array.from(new FormData($form)).reduce(
    (obj, [key, value]) => ({
      ...obj,
      [key]: value,
    }),
    {}
  );

export const signInFormValidation = {
  userid: {
    value: "",
    get isValid() {
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        this.value
      );
    },
    error: "이메일 형식에 맞게 입력해 주세요.",
  },

  password: {
    value: "",
    get isValid() {
      return /^[A-Za-z0-9]{6,12}$/.test(this.value);
    },
    error: "영문 또는 숫자를 6~12자 입력하세요.",
  },

  get isValid() {
    return this.userid.isValid && this.password.isValid;
  },
};

export const signUpFormValidation = {
  userid: {
    value: "",
    get isValid() {
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        this.value
      );
    },
    error: "이메일 형식에 맞게 입력해 주세요.",
  },

  password: {
    value: "",
    get isValid() {
      return /^[A-Za-z0-9]{6,12}$/.test(this.value);
    },
    error: "영문 또는 숫자를 6~12자 입력하세요.",
  },

  username: {
    value: "",
    get isValid() {
      return !!this.value;
    },
    error: "이름을 입력해 주세요.",
  },

  "confirm-password": {
    value: "",
    get isValid() {
      return signUpFormValidation.password.value === this.value;
    },
    error: "패스워드가 일치하지 않습니다.",
  },

  get isValid(): boolean {
    return (
      this.userid.isValid &&
      this.password.isValid &&
      this.username.isValid &&
      this["confirm-password"].isValid
    );
  },
};

export type SignInFormValidation = typeof signInFormValidation;
export type SignUpFormValidation = typeof signUpFormValidation;
