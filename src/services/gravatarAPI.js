import md5 from 'crypto-js/md5';

const fetchGravatar = (email) => {
  const url = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  return url;
};

export default fetchGravatar;
