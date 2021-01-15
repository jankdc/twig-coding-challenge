const { groupArrayElements } = require("./groupArrayElements");

describe("groupArrayElements", () => {
  it.each`
    elements              | partitions | expected
    ${[1, 2, 3, 4, 5]}    | ${1}       | ${[[1, 2, 3, 4, 5]]}
    ${[1, 2, 3, 4, 5]}    | ${2}       | ${[[1, 2, 3, 4, 5], []]}
    ${[1, 2, 3, 4, 5]}    | ${3}       | ${[[1, 2], [3, 4], [5]]}
    ${[1, 2, 3, 4, 5]}    | ${4}       | ${[[1], [2], [3], [4, 5]]}
    ${[1, 2, 3, 4, 5]}    | ${5}       | ${[[1], [2], [3], [4], [5]]}
    ${[1, 2, 3, 4, 5, 6]} | ${4}       | ${[[1, 2], [3, 4], [5, 6], []]}
  `(
    "groups $elements with $partitions partitions",
    ({ elements, partitions, expected }) => {
      expect(groupArrayElements(elements, partitions)).toEqual(expected);
    }
  );

  it("throws when passing an invalid partitions value", () => {
    const elements = [1, 2, 3, 4, 5];
    const partitions = 0;
    expect(() => groupArrayElements(elements, partitions)).toThrow(
      "Invalid partitions value"
    );
  });

  it("throws when a partitions value is higher than the number of elements", () => {
    const elements = [1, 2, 3, 4, 5];
    const partitions = 6;
    expect(() => groupArrayElements(elements, partitions)).toThrow(
      "Partitions is higher than the number of elements"
    );
  });
});
