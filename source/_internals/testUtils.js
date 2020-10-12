import combinate from 'combinate'
import { equals, filter, forEach, map, omit, switcher, type } from 'rambdax'

const omitOk = omit('ok')

const PENDING = 'PENDING'
const RESULTS_EQUAL = 'results are equal'
const RESULTS_MISMATCH = 'results are different'
const ERRORS_EQUAL = 'errors are equal'
const ERRORS_MISMATCH = 'errors are different'
const SHOULD_THROW = 'Rambda should throw'
const SHOULD_NOT_THROW = 'Rambda should not throw'
const ALL_ERROR_LABELS = {
  RESULTS_MISMATCH,
  ERRORS_MISMATCH,
  SHOULD_NOT_THROW,
  SHOULD_THROW,
}
const MISSING = 'Missing error handle in parseError'

function parseError(err){
  const typeError = switcher(err)
    .is(x => x instanceof TypeError, 'TypeError')
    .is(x => x instanceof SyntaxError, 'SyntaxError')
    .is(x => x instanceof RangeError, 'RangeError')
    .is(x => x instanceof Error, 'Error')
    .default(MISSING)

  if (typeError === MISSING){
    throw new Error('typeError === MISSING')
  }

  return {
    message : err.message,
    type    : typeError,
    ok      : true,
  }
}

export function show(input){
  const typeInput = type(input)
  if ([ 'Promise', 'Async' ].includes(typeInput)){
    return ''
  }

  if (typeInput === 'Array'){
    if (input.length === 0) return '[]'

    return `[${ input.map(show).join(', ') }]`
  }

  if (typeInput === 'Object'){
    if (Object.keys(input).length === 0) return '{}'

    return JSON.stringify(map(show, input))
  }
  if ([ 'Boolean', 'Number', 'String' ].includes(typeInput)){
    return input
  }
  if ([ 'Null', 'Undefined' ].includes(typeInput)){
    return typeInput.toLowerCase()
  }

  return input.toString()
}

function executeSync(fn, inputs){
  let result = PENDING
  let error = { ok : false }
  try {
    result = fn(...inputs)
  } catch (e){
    error = parseError(e)
  }

  return {
    result,
    error,
  }
}

async function executeAsync(fn, inputs){
  let result = PENDING
  let error = { ok : false }
  try {
    result = await fn(...inputs)
    console.log(result)
  } catch (e){
    error = parseError(e)
  }

  return {
    result,
    error,
  }
}

function countErrors(){}

export function profileMethod(
  firstInput,
  secondInput = undefined,
  thirdInput = undefined,
  fn
){
  const combinationsInput = filter(Boolean, {
    firstInput,
    secondInput,
    thirdInput,
  })
  const inputKeys = Object.keys(combinationsInput)
  const combinations = combinate(combinationsInput)

  combinations.forEach(combination => {
    const inputs = [
      combination.firstInput,
      combination.secondInput,
      combination.thirdInput,
    ].filter((_, i) => i < inputKeys.length)

    test(getTestTitle(...inputs), () => {
      const { result, error } = executeSync(fn, inputs)

      expect({
        result,
        error : error.ok ? omitOk(error) : PENDING,
        inputs,
      }).toMatchSnapshot()
    })
  })
}

export function profileMethodAsync({
  firstInput,
  secondInput = undefined,
  thirdInput = undefined,
  fn,
}){
  const combinationsInput = filter(Boolean, {
    firstInput,
    secondInput,
    thirdInput,
  })
  const inputKeys = Object.keys(combinationsInput)
  const combinations = combinate(combinationsInput)

  combinations.forEach(combination => {
    const inputs = [
      combination.firstInput,
      combination.secondInput,
      combination.thirdInput,
    ].filter((_, i) => i < inputKeys.length)
    test(getTestTitle(...inputs), async () => {
      const { result, error } = await executeAsync(fn, inputs)

      expect({
        result,
        error : error.ok ? omitOk(error) : PENDING,
        inputs,
      }).toMatchSnapshot()
    })
  })
}

export function compareToRamda(fn, fnRamda){
  return (...inputs) => {
    const { result, error } = executeSync(fn, inputs)
    const { result: ramdaResult, error: ramdaError } = executeSync(fnRamda,
      inputs)

    const toReturn = {
      result,
      ramdaResult,
      ramdaError : ramdaError.ok ? omitOk(ramdaError) : PENDING,
      error      : error.ok ? omitOk(error) : PENDING,
    }

    if (result !== PENDING){
      if (ramdaError.ok){
        return {
          ...toReturn,
          ok    : false,
          label : SHOULD_THROW,
        }
      }

      if (equals(result, ramdaResult)){
        return {
          ...toReturn,
          ok    : true,
          label : RESULTS_EQUAL,
        }
      }

      return {
        ...toReturn,
        ok    : false,
        label : RESULTS_MISMATCH,
      }
    }

    if (equals(error, ramdaError)){
      return {
        ...toReturn,
        ok    : true,
        label : ERRORS_EQUAL,
      }
    }

    if (ramdaError.ok){
      return {
        ...toReturn,
        ok    : false,
        label : ERRORS_MISMATCH,
      }
    }

    return {
      ...toReturn,
      ok    : false,
      label : SHOULD_NOT_THROW,
    }
  }
}

export const getTestTitle = (...inputs) => inputs.map(type).join(' | ')

export const compareCombinations = ({
  firstInput,
  secondInput = undefined,
  thirdInput = undefined,
  setCounter = () => {},
  setGlobalCounter = () => {},
  callback = x => {},
  fn,
  fnRamda,
}) => {
  const counter = {
    RESULTS_MISMATCH : 0,
    SHOULD_THROW     : 0,
    SHOULD_NOT_THROW : 0,
    ERRORS_MISMATCH  : 0,
    ERRORS_DIFFERENT : 0,
  }

  const increaseCounter = comparedResult => {
    if (comparedResult.ok) return
    let counterProp
    forEach((x, prop) => {
      if (x === comparedResult.label) counterProp = prop
    }, ALL_ERROR_LABELS)
    counter[ counterProp ]++
  }

  const combinationsInput = filter(Boolean, {
    firstInput,
    secondInput,
    thirdInput,
  })
  const inputKeys = Object.keys(combinationsInput)
  const combinations = combinate(combinationsInput)
  const compareOutputs = compareToRamda(fn, fnRamda)
  afterAll(() => callback(counter))
  combinations.forEach(combination => {
    const inputs = [
      combination.firstInput,
      combination.secondInput,
      combination.thirdInput,
    ].filter((_, i) => i < inputKeys.length)

    test(getTestTitle(...inputs), () => {
      const compared = compareOutputs(...inputs)
      setGlobalCounter()

      if (!compared.ok){
        increaseCounter(compared)
        setCounter()
        expect({
          ...compared,
          inputs,
        }).toMatchSnapshot()
      }
    })
  })
}

/*
  describe("r.evolve", () => {
  let counter = 0;
  let globalCounter = 0;

  afterAll(() => {
    console.log({ counter });
    console.log({ globalCounter });
  });
  compareCombinations({
    firstInput: possibleRules,
    setCounter: () => counter++,
    setGlobalCounter: () => globalCounter++,
    callback: errorsCounter => {
      expect(
        errorsCounter
      ).toMatchInlineSnapshot()
    },
    secondInput: possibleIterables,
    fn: evolve,
    fnRamda: evolveRamda,
  });
});
*/
