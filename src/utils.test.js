const { spawnSync } = require("child_process");
const events = require("events");
const buffer = require("buffer");

jest.mock("child_process");

const { sortByKey, executeSyncCmd } = require("./utils");

test("can executeSyncCmd", () => {
  defaultEnvs = { env: { ...process.env }, shell: true };

  spawnSync.mockReturnValue({
    status: 0,
    stdout: new events.EventEmitter(),
  });

  executeSyncCmd("fakecmd", [`asdf`, `1234`], `failed to run echo`);

  expect(spawnSync).toHaveBeenLastCalledWith(
    "fakecmd",
    [`asdf`, `1234`],
    defaultEnvs
  );
});

test("can executeSyncCmd with extra envs", () => {
  extraEnvs = { ASDF: 123, QWER: 321 };
  defaultEnvs = { env: { ...process.env, ...extraEnvs }, shell: true };

  spawnSync.mockReturnValue({
    status: 0,
    stdout: new events.EventEmitter(),
  });

  executeSyncCmd("fakecmd", [`asdf`, `1234`], `failed to run echo`, extraEnvs);

  expect(spawnSync).toHaveBeenLastCalledWith(
    "fakecmd",
    [`asdf`, `1234`],
    defaultEnvs
  );
});

test("can executeSyncCmd throw custom error message", () => {
  defaultEnvs = { env: { ...process.env }, shell: true };

  spawnSync.mockReturnValue({
    status: 1,
    stdout: new events.EventEmitter(),
  });

  expect(() =>
    executeSyncCmd("fakecmd", [`asdf`, `1234`], `failed to run echo`)
  ).toThrow(new Error(`failed to run echo`));

  expect(spawnSync).toHaveBeenLastCalledWith(
    "fakecmd",
    [`asdf`, `1234`],
    defaultEnvs
  );
});

test("can executeSyncCmd throw stderr", () => {
  defaultEnvs = { env: { ...process.env }, shell: true };

  var lErr = buffer.Buffer.from("error message");
  spawnSync.mockReturnValue({
    status: 1,
    stderr: lErr,
  });

  expect(() => executeSyncCmd("fakecmd", [`asdf`, `1234`])).toThrow(
    new Error(`error message`)
  );

  expect(spawnSync).toHaveBeenLastCalledWith(
    "fakecmd",
    [`asdf`, `1234`],
    defaultEnvs
  );
});

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
