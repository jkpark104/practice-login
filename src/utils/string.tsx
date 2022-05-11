// eslint-disable-next-line import/prefer-default-export
export const replaceFrontLetterToCapital = (value: string) => {
  const stringChunks = value.split("-");

  const replacedStringChunks = stringChunks.map((chunk) => {
    const frontLetter = chunk[0];
    const restOfLetters = chunk.substring(1);

    return frontLetter.toUpperCase() + restOfLetters;
  });

  return replacedStringChunks.join("-");
};
