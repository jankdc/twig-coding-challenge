/**
 * Groups the array of elements into the specified number of partitions.
 *
 * When the number of partitions (N) doesn't fit nicely with the number of elem-
 * ents, we can at least make the first (N - 1) partitions have equal number of
 * elements, and put the leftovers (if any) to the last Nth partition.
 *
 * @param {Array} elements An array of elements to partition
 * @param {number} partitions The number of partitions when grouping the elements
 * @returns {Array[]} A 2d array where each sub-array represents a partition
 */
function groupArrayElements(elements, partitions) {
  if (partitions > elements.length) {
    throw new Error("Partitions is higher than the number of elements");
  }

  if (partitions < 1) {
    throw new Error("Invalid partitions value");
  }

  if (partitions === 1) {
    return [elements];
  }

  const canFitEqually = elements.length % partitions === 0;
  if (canFitEqually) {
    const partitionSize = elements.length / partitions;
    return createPartitions(elements, partitions, partitionSize);
  }

  const equalPartitions = partitions - 1;
  // Flooring gets us an even split between the partitions
  const partitionSize = Math.floor(elements.length / equalPartitions);
  // Whilst this will pick up what was left to make the first (N - 1) partitions even
  const remainder = elements.length % equalPartitions;

  const remainingElements = elements.slice(elements.length - remainder);
  return createPartitions(elements, equalPartitions, partitionSize).concat([
    remainingElements,
  ]);
}

function createPartitions(elements, numOfPartitions, partitionSize) {
  return Array.from(Array(numOfPartitions)).map((_, index) => {
    const start = index * partitionSize;
    return elements.slice(start, start + partitionSize);
  });
}

module.exports = {
  groupArrayElements,
};
