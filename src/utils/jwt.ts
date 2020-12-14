import jwtDecode from 'jwt-decode';

export const decode = (token: string): any => {
  return jwtDecode(token);
};
