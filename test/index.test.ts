import { api } from "../src";

test("Api", () => {
  const john = { id: "123", name: "John Doe", birth: new Date("2000") };
  api.addPerson(john);
  expect(api.getPerson("123")).toEqual(john);
  const epoch = { id: "456", name: "Epoch", birth: new Date(0) };
  api.addPerson(epoch);
  expect(api.getPeople()).toEqual([john, epoch]);
});
