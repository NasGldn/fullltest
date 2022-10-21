module.exports.fizzBuzz = (n) => {
    const numbers = Array.from({length: n}, (_, i) => i + 1)

    const fizzbuzz = (x) => {
        const fizz = (x % 3 ? '' : 'fizz');
        const buzz = (x % 5 ? '' : 'buzz');
        return fizz + buzz  || x;
    }
    const result = numbers.map(fizzbuzz);
    
    return result;
}