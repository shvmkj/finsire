export function fetchData() {
  const data = [];
  const n = Math.random() * 100;
  for (var i = 0; i < 60 && i < n; i++) {
    data.push(
      parseInt(Math.random() * Math.pow(Math.random() * 2, 10))
    );
  }
  // data.push(1, 2);
  return Promise.resolve({
    data,
    status: "Success",
    statusCode: 200,
  });
}
