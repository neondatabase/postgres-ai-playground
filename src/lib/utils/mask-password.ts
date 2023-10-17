export const maskPassword = (connectionString: string) => {
  let arr = connectionString.split(':');
  let masked_password = '******';
  return [arr[0], arr[1], masked_password + '@' + arr[2].split('@')[1]].join(':');
};
