import { RrnPattern } from './patterns';

interface Result {
  male: boolean;
  birth: string;
}

export default (rrn: string): Result | void => {
  if (!RrnPattern.test(rrn)) {
    return;
  }
  const splited = rrn.split('-');
  const result = { male: true, birth: '' };
  const sexNum = splited[1].charAt(0);
  switch (sexNum) {
    case '1':
    case '3':
    case '5':
    case '7':
      break;
    case '2':
    case '4':
    case '6':
    case '8':
      result.male = false;
      break;
    default:
      return;
  }
  let century = '19'; //세기-1, 주민번호 앞 두자리
  switch (sexNum) {
    case '1':
    case '2':
    case '5':
    case '6':
      break;
    case '3':
    case '4':
    case '7':
    case '8':
      century = '20';
      break;
    default:
      return;
  }
  const birthPart = splited[0];
  result.birth =
    century +
    birthPart.substring(0, 2) +
    '-' +
    birthPart.substring(2, 4) +
    '-' +
    birthPart.substring(4, 6);
  return result;
};
