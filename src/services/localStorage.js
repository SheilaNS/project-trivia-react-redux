// ranking: [ { name(playerName), score(number) , picture(gravatarURL) } ]
export const addLocalScore = (score) => localStorage
  .setItem('ranking', JSON.parse(score));

export const getLocalScore = () => localStorage.getItem('ranking');
