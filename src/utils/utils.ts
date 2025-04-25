// 전화번호 포맷을 처리하는 함수
export const formatPhoneNumber = (phone: string): string => {
  return phone.indexOf("+82") > -1 ? phone : "+82" + phone;
};
