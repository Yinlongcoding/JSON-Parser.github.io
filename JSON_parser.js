var parseBtn = document.querySelector('#btn')
var pText = document.querySelector('p')

parseBtn.addEventListener('click', function(){
    var JsonString = document.querySelector('#JSON_area').value
    pText.innerHTML = "The result is in Dev tools"
    console.log(jsonpars(JsonString))
})

    
function jsonpars(jsonString) {
        var theJson = '',
            index = 0,
            onOff = false
        // clear blank
        for (var i = 0; i < jsonString.length; i++) {
            if (jsonString[i] == '"') {
                onOff = onOff ? false : true
            }
            if (!onOff && 
                (jsonString[i] == ' '  || 
                 jsonString[i] == '\n' || 
                 jsonString[i] == '\r' || 
                 jsonString[i] == '\t')) {
                continue
            }
            theJson = theJson + jsonString[i]
        }

        return parse()
        /**
         * 指针指向合适的位置时进行的解析函数，根据字符串不同的表现返回不同的值
         * @param  {string} jsonString 当前需要解析的字符串（可能是递归后的值）
         * @param  {number} index     var indexChar[指针]
         * @return {*}                 解析后的值
         */
        function parse() {
            var indexChar = theJson[index]

            if (indexChar == '{') {
                return parseObject()
            }

            if (indexChar == '[') {
                return parseArray()
            }

            if (indexChar == 't') {
                return parseTrue()
            }

            if (indexChar == 'f') {
                return parseFalse()
            }

            if (indexChar == 'n') {
                return parseNull()
            }

            if (indexChar == '"') {
                return parseString()
            }

            if (isDigit(indexChar)) {
                return parseNumber()
            }
        }

        /**
         * parseNumber 解析值为数字的 value
         * @return {number *} 
         */
        function parseNumber() {
            for (var i = index + 1;; i++) {
                if (!isDigit(theJson[i])) {
                    break
                }
            }
            var num = theJson.slice(index, i)
            index = i
            return parseInt(num)
        }
        /**
         * 判断一个字符能否转换为数字
         * @param  {string}  char 传入的单个字符
         * @return {Boolean}      如果能转换为数字，返回true
         */
        function isDigit(char) {
            if (!char) {
                return false
            }
            var the0 = '0'.charCodeAt(0)
            var the9 = '9'.charCodeAt(0)
            var theChar = char.charCodeAt(0)
            if (the0 <= theChar && theChar <= the9) {
                return true
            } else {
                return false
            }
        }
        /**
         * parseString 解析值为字符串的value值
         * @return {string} 返回作为值的字符串
         */
        function parseString() {
            var theEnd = theJson.indexOf('"', index + 1)
            var theString = theJson.slice(index + 1, theEnd)
            index = theEnd + 1
            return theString
        }
        /**
         * parseNull 解析 值为null的value值
         * @return {string *} 返回null
         */
        function parseNull() {
            index += 4
            return null
        }
        /**
         * parseFalse 解析值为 false 的 value 值
         * @return {boolean} 返回false
         */
        function parseFalse() {
            index += 5
            return false
        }
        /**
         * parseFalse 解析值为 true 的 value 值
         * @return {boolean} 返回true
         */
        function parseTrue() {
            index += 4
            return true
        }
        /**
         * parseArray 递归解析数组
         * @return {array} 返回一个数组
         */
        function parseArray() {
            var result = [],
                product
            index++
            for (;;) {
                product = parse()
                result.push(product)
                if (theJson[index] === ',') {
                    index++
                    continue
                }
                if (theJson[index] === ']') {
                    break
                }
            }
            index++
            return result
        }
        /**
         * parseObject 递归解析对象
         * @return {object} 返回对象
         */
        function parseObject() {
            var result = {},
                key,
                value
            index++
            for (;;) {
                key = parseString()
                index++
                value = parse()
                result[key] = value
                if (theJson[index] === "}") {
                    break
                }
                if (theJson[index] === ",") {
                    index++
                    continue
                }
            }
            index++
            return result
        }
}




