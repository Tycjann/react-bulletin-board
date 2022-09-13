const dateToStr = (date) => {
  // const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const options = { day: 'numeric', year: 'numeric', month: 'numeric' };

  const dt = new Date(date);

  return dt.toLocaleDateString('pl-PL', options);
};

export default dateToStr;
