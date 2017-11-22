/**
 * Gets a value and if the value if falsy throws an error
 */
function getAssert(val) {
  if (!val) {
    throw new Error('Value should exists');
  }
  return val;
}

module.exports = { getAssert }
