// Function to generate an array containing the numbers within a range
export function range(start, end) {
  const arr = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  )
  return arr
}
