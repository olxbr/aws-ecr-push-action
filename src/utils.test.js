const { sortByKey } = require("./utils");

test("Test Date object Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-03-26T15:45:32.000Z") },
    { date: new Date("2022-01-26T15:45:32.000Z") },
    { date: new Date("2022-06-26T15:45:32.000Z") },
  ];

  const sortedArray = sortByKey(arrayToBeSorted, "date");
  expect(sortedArray).toStrictEqual([
    { date: new Date("2022-01-26T15:45:32.000Z") },
    { date: new Date("2022-03-26T15:45:32.000Z") },
    { date: new Date("2022-06-26T15:45:32.000Z") },
  ]);
});

test("Test Date hour difference Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-06-26T10:45:32.000Z") },
    { date: new Date("2022-06-26T05:45:32.000Z") },
    { date: new Date("2022-06-26T15:45:32.000Z") },
  ];

  const sortedArray = sortByKey(arrayToBeSorted, "date");
  expect(sortedArray).toStrictEqual([
    { date: new Date("2022-06-26T05:45:32.000Z") },
    { date: new Date("2022-06-26T10:45:32.000Z") },
    { date: new Date("2022-06-26T15:45:32.000Z") },
  ]);
});

test("Test Date Minutes difference Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-03-26T15:15:32.000Z") },
    { date: new Date("2022-03-26T15:10:32.000Z") },
    { date: new Date("2022-03-26T15:45:32.000Z") },
  ];
});

test("Test Date object Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-03-26T15:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-01-26T15:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T15:45:32.000Z") }, // NOSONAR
  ];

  const sortedArray = sortByKey(arrayToBeSorted, "date");
  expect(sortedArray).toStrictEqual([
    { date: new Date("2022-01-26T15:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-03-26T15:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T15:45:32.000Z") }, // NOSONAR
  ]);
});

test("Test Date hour difference Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-06-26T10:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T05:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T15:45:32.000Z") }, // NOSONAR
  ];

  const sortedArray = sortByKey(arrayToBeSorted, "date");
  expect(sortedArray).toStrictEqual([
    { date: new Date("2022-06-26T05:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T10:45:32.000Z") }, // NOSONAR
    { date: new Date("2022-06-26T15:45:32.000Z") }, // NOSONAR
  ]);
});

test("Test Date Minutes difference Sort By key", async () => {
  const arrayToBeSorted = [
    { date: new Date("2022-03-26T15:15:32.000Z") }, // NOSONAR
    { date: new Date("2022-03-26T15:10:32.000Z") }, // NOSONAR
    { date: new Date("2022-03-26T15:45:32.000Z") }, // NOSONAR
  ];

  const sortedArray = sortByKey(arrayToBeSorted, "date");
  expect(sortedArray).toStrictEqual([
    { date: new Date("2022-03-26T15:10:32.000Z") }, // NOSONAR
    { date: new Date("2022-03-26T15:15:32.000Z") }, // NOSONAR
    { date: new Date("2022-03-26T15:45:32.000Z") }, // NOSONAR
  ]);
});
