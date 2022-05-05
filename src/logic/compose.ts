/**
 * Функция высшего порядка, применяет к аргмуенту функции справа на лево
 */
function compose(...functions: Function[]): any {
  return function inner(arg: any) {
    return functions.reduceRight((curArg, curFunc) => curFunc(curArg), arg);
  };
}

/**
 * Функция высшего порядка, применяет к аргмуенту функции с лева на право
 */
function pipe(...functions: Function[]): any {
  return function inner(arg: any) {
    return functions.reduce((curArg, curFunc) => curFunc(curArg), arg);
  };
}

/**
 * Функция высшего порядка, применяет функции к аргументу @count раз
 */
function composeNTimes(func: Function, count: number = 1, arg: any) {
  const funcNTimes = new Array(count).fill(func);
  return compose(...funcNTimes)(arg);
}

export { compose, pipe, composeNTimes };
