const numbersName = {
    '1': ['jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'],
    '2': ['dziesięć', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'],
    '3': ['sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset'],
    'child': ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście']
}
const fattyNumber = {
    '1': [' ', ' ', ' '],
    '2': ['tysiąc', 'tysiące', 'tysięcy'],
    '3': ['milion', 'miliony', 'milionów'],
    '4': ['miliard', 'miliardy', 'miliardów'],
    '5': ['bilion', 'biliony', 'bilionów'],
    '6': ['biliard', 'biliardy', 'biliardów'],
    '7': ['trylion', 'tryliony', 'trylionów'],
    '8': ['tryliard', 'tryliardy', 'tryliardów']
}
const input = document.querySelector("#numberInput");

function retriveNumberFormat(number) {
    const tab = number.split(' ');
    return Number((tab.join('')).replace(',', '.'))
}

function numbersChunks(sliceQuantity, digitsArray) {
    let sliceArray = [];
    let z = digitsArray.length;
    for (let i = 0; i < sliceQuantity; i++) {
        sliceArray.push(digitsArray.slice(z - 3 > 0 ? z - 3 : 0, z));
        z = z - 3
    }
    return sliceArray
};

function numbersInWords(number) {
    let mapNumber = number.length;
    let liczba = '';
    for (let i = 0; i < number.length; i++) {
        if (number[i] > 0) {
            if (mapNumber == 2 && number[i] == 1) {
                liczba = liczba + ' ' + numbersName.child[(parseInt(number[number.length - 1]) + parseInt(number[number.length - 2])) - 1];
                i++
            } else {
                liczba = liczba + ' ' + numbersName[mapNumber][number[i] - 1]
            }
        }
        --mapNumber
    }
    return liczba
};

function whatFattyOfNumber(numbers, lengthOfEnd) {
    let forChildNumber = numbers[numbers.length - 2] == 1;
    let whatNumber;
    if (numbers[numbers.length - 1] == 1 && numbers.length == 1) {
        whatNumber = 0
    } else if (numbers[numbers.length - 1] == 2 || numbers[numbers.length - 1] == 3 || numbers[numbers.length - 1] == 4) {
        forChildNumber == !1 ? whatNumber = 1 : whatNumber = 2
    } else {
        whatNumber = 2
    }
    return fattyNumber[lengthOfEnd][whatNumber]
};

function returnResult() {
    const digitsArray = String(retriveNumberFormat(input.value));
    const digitsArrayWithoutDecimal = String(Math.trunc(digitsArray));
    const sliceQuantity = digitsArrayWithoutDecimal.length > 3 ? Math.ceil((digitsArrayWithoutDecimal.length) / 3) : 1;
    const numbers = numbersChunks(sliceQuantity, digitsArrayWithoutDecimal);
    let result = '';
    if (digitsArray > 0) {
        for (let i = 0; i < sliceQuantity; i++) {
            let numb = numbersInWords(numbers[(numbers.length - 1) - i]);
            let pow;
            if (numb > '' || sliceQuantity - 1 == i) {
                pow = whatFattyOfNumber((numbers[(numbers.length - 1) - i]), sliceQuantity - i)
            } else {
                pow = ''
            }
            result = result + ' ' + numb + ' ' + pow
        }
    } else {
        result = 'Przydało by się coś wpisać'
    }
    document.querySelector('#resault').innerHTML = result.trim() + ' ';
};
document.querySelector('#check').addEventListener('click', returnResult);