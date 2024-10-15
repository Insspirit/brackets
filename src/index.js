module.exports = function check(str, bracketsConfig) {
  // your solution

  let stack = [] // создали стек куда будем кидать открывающие скобы

  for (let i = 0; i < str.length; i++) { //проходим по каждому символу в строке str

    let char = str[i] // текущий символ
    let isOpening = false //для проверки откывающая скобка или нет
    let sameBracketPair = false //на случай если скобки одинаковые 

    for (let j = 0; j < bracketsConfig.length; j++) { //а это уже смотрим пары

      // проверка для скоб, которые такие || 
      if (bracketsConfig[j][0] === bracketsConfig[j][1] && char === bracketsConfig[j][0]) {
        sameBracketPair = true
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop() // если такая скоба есть в стеке, то выкидываем 
        } else { // а если нет, то считаем её открытой true
          stack.push(char)
        }
        isOpening = true
        break
      }

      if (char === bracketsConfig[j][0]) { //если текущий символ char совпадает с открывающей скобкой
        isOpening = true// то это открывающая скобка
        stack.push(char) // добавили в стек
        break //выводим эту скобку из цикла, так как уже проверили 
      }
    }

    if (!isOpening) { //если не открывающая - значит закрывающая

      if (stack.length === 0) { // проверяем есть ли для нее открывающая
        return false // если стек пуст (=== 0) то закрывающей скобки нету false 
      }
      let lastOpening = stack.pop() // убираем последнюю открывающую скобку 

      let isMatching = false // переменнная что бы искать пару 

      for (let j = 0; j < bracketsConfig.length; j++) {
        if (lastOpening === bracketsConfig[j][0] && char === bracketsConfig[j][1]) {
          isMatching = true // если пары совпали, то последовательность правильная
          break// прерываем цикл
        }
      }
      if (!isMatching) { //если не совпадают, то возвращаем false 
        return false
      }
    }
  }
  return stack.length === 0  // если стек пуст  (равен нулю), то все скобы закрыты
}
