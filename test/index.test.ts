import { api } from "../src";

test("Api", () => {
  const john = {
    id: "123",
    name: "John Doe",
    birth: new Date("2000"),
    gender: "male"
  };
  api.addPerson(john);
  expect(api.getPerson("123")).toEqual(john);
  const epoch = {
    id: "456",
    name: "Epoch",
    birth: new Date(0),
    gender: "machine"
  };
  api.addPerson(epoch);
  expect(api.getPeople()).toEqual([john, epoch]);
});
