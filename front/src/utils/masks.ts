export const rrnMask = (text: string) => {
  //중간 dash 포함
  const len = text.length;
  return text.substring(0, 8) + '●'.repeat(Math.max(len - 8, 0));
};
