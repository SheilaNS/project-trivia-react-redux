export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  return data.token;
};

export const fetchQuiz = async (tokenPlayer) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${tokenPlayer}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
