var fs = require("fs");


var secret = function (words,fibonacci,algorithm) {

/* 
var x = vowels('paliNdrome');

words = ['sHeRgA','BuSiNeSs','sHoTgUn','nYgNaS','nYgNaS','GoBbLiNg','sHoTgUn','BaT','bIrD','xEzYmS'];
return Thor(words,5);

var x;

var x = vowels('sUcKyJ');

return 'hello';


return Thor(words,5);

var x;

words = ['DrOwN','BlUsHiNg','bEaM','sHeRgA','mAtErIaLsNeEdEd','gUm','bEaM','InSuRaNcE','DrOwN','DiPlOmAtIc'];
var x = CaptainAmerica(words,1597);

var y;

console.log(x);
*/

    switch(algorithm) {
    case 'IronMan':
        return IronMan(words);
        break;
    case 'CaptainAmerica':                    
        return CaptainAmerica(words,fibonacci);
        break;
    case 'Thor':
        return Thor(words,fibonacci);
        break;
    case 'TheIncredibleHulk':
        return TheIncredibleHulk(words);
        break;
     default:
        return "Algorithm not supported";
        break;        
    }
      
};


function sortAlphabetic (array) {
	return array.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
}


function vowels(word) {
    var a = word.split('');
    var temp = '';
    var isLastVowel = false;
    var lastVowelMoved = false;
    
    if(isVowel(a[a.length-1])){
       isLastVowel = true; 
    }
    
    for (var i = 0; i < a.length-1; i++) {

        switch (a[i]) {
            case 'a': case 'e': case 'i': case 'o': case 'u': case 'y': case 'A': case 'E': case 'I': case 'O': case 'U': case 'Y':
            
            temp = a[i+1];
            a[i+1] = a[i];
            a[i] = temp;
			
            if((i+1)==(a.length-1)){
                i = i + 2;
                lastVowelMoved = true;    
            }else{
                i++;            
            }            
                                    
            break;
            default:
        }
    }

    var joinString = a.join('');
    var result = joinString;

    if ((isLastVowel == true) && (lastVowelMoved == false)) {

    	result = joinString.substr(joinString.length-1) + joinString.substr(0,joinString.length-1);
    }
    return result;
}

function consonants(word,upperCaseFlag) {
    var a = word.split('');
            
    for (var i = 0; i < a.length; i++) {
       if (!isVowel(a[i]) && !isFinite(a[i]) ) { 
            if(upperCaseFlag){
                a[i] = a[i].toLowerCase();
                upperCaseFlag = false;
            }else{
                a[i] = a[i].toUpperCase();
                upperCaseFlag = true; 
            }
       } else {
             
       }    
    }

    var joinString = a.join('');
    var result = joinString;
    
    return [result,upperCaseFlag];
}

function isVowel(vowel) {
  return (/^[aeiouy]$/i).test(vowel);
}

function segmentWords(originalWord){
        
        //originalWord = originalWord.toLowerCase();
                                       
        if(searchDictionary(originalWord)) {
            return originalWord;
        }
               
        for (var i = 1; i < originalWord.length; i++) {

            var firstWord = originalWord.substr(0,i);
            
            if(searchDictionary(firstWord)){
                
                var secondWord = originalWord.substr(i,originalWord.length);
                var nextWord = segmentWords(secondWord);
                                
                if(nextWord != null){                    
                    return firstWord + "," + nextWord;
                }              
                
            }                     
        }   

         return null;                        
}

function nextFibonacciNumber(currentFibonacciNumber){
    var i;
    var fib = [];
    var nextFibNumber;
    
    fib[0] = 0;
    fib[1] = 1;
    for(i=2; i<=2000; i++)
    {
        fib[i] = fib[i-2] + fib[i-1];
        nextFibNumber = fib[i];
        
        if(fib[i-1] == currentFibonacciNumber){
            return nextFibNumber;
        }
        
    }  
}

function vowelsFibonacci(word,fibonacci,nextFibonacciFlag){
    var a = word.split('');

    for (var i = 0; i < a.length; i++) {
        if (isVowel(a[i])) {
            
            if(nextFibonacciFlag == -1){
                nextFibonacciFlag = 0;
                a[i] = fibonacci;
            }else {
                fibonacci = nextFibonacciNumber(fibonacci);
                a[i] = fibonacci;
            }
            

        }
                            
    }

    var joinString = a.join('');
    var result = joinString;

    return [result,fibonacci];
}

function searchDictionary(searchString){
    
    var searchWord = '@'+searchString.toLowerCase()+'@';
    
    var file = fs.readFileSync("words4.txt", "utf8");
    var position = file.indexOf(searchWord);

    if(position == -1 ){
        return false;
    }else {
        return true;
    }
 
}

function IronMan (secretPhrase) {
	//Iron Man
    var result = "";
    var separator = "";
    var scrambledWord;
        
    secretPhrase = secretPhrase.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
    
        for (var i = 0; i < secretPhrase.length; i++) {         
         
            if (i == 0) {
               
               scrambledWord = vowels(secretPhrase[secretPhrase.length-1]);
               separator = scrambledWord.charCodeAt(0);
               
    	       result = vowels(secretPhrase[i]) + separator;
               
            } else {
               
               scrambledWord = vowels(secretPhrase[i-1]);
               separator = scrambledWord.charCodeAt(0);
                                                           
               result = result  + vowels(secretPhrase[i]) + separator;
            
            }                                    
    }
    console.log("before base 64 " + result);
    return (new Buffer(result).toString('base64'));
    
}

function TheIncredibleHulk (secretPhrase) {
	//Strongest one there is
    var result = "";
    var separator = "*";
    

    for (var i = 0; i < secretPhrase.length; i++) {                  
        secretPhrase[i] = vowels(secretPhrase[i]);
    }
                    
    secretPhrase.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
    secretPhrase.reverse();
    
    for (var i = 0; i < secretPhrase.length; i++) {                  
        
        if (i == (secretPhrase.length-1)) {
            result = result + separator + secretPhrase[i];
        }else {
            if(i == 0){
                result = secretPhrase[i];
            } else {
                result = result + separator + secretPhrase[i];
            }

        }
   
    }

    console.log("before base 64 " + result);
    return (new Buffer(result).toString('base64'));
    
}

function Thor(secretPhrase,fibonacci){
    //Lighting God
    var result = "";
    var temp = "";
    var separator = "*";
    var nextFibonacci;
    var FibonacciFlag = -1;
    var resultVowelsFibonacci;
    var resultConsonants;
    
    
    var array = [];
    var segment;

        for (var i = 0; i < secretPhrase.length; i++) {
                          
             segment = segmentWords(secretPhrase[i])
             
            if(segment == null){
                segment = secretPhrase[i];
            }
                
             if(temp == ""){
             temp = temp + segment;  
             }else {
             temp = temp + ","+ segment;
             }
                                                                                                                               
        }
           
    array = temp.split(",");
    array.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
    
    var upperCaseFlag;
    
    if(array[0].charAt(0)==array[0].charAt(0).toUpperCase()){
        upperCaseFlag = false;  
    }else {
        upperCaseFlag = true;
    }   
                      
    for (var k = 0; k < array.length; k++){
        
     
        
        if(FibonacciFlag == -1){
           resultVowelsFibonacci = vowelsFibonacci(array[k],fibonacci,FibonacciFlag);
           FibonacciFlag = 0;
            
        }else {
           resultVowelsFibonacci = vowelsFibonacci(array[k],nextFibonacci,FibonacciFlag);
        }
        
        nextFibonacci = resultVowelsFibonacci[1];                        
        array[k] = resultVowelsFibonacci[0];
        
        resultConsonants = consonants(array[k],upperCaseFlag);
        upperCaseFlag = resultConsonants[1]
        array[k] = resultConsonants[0]
        
                        
        if (k == 0) {                    
            result = array[k];                    
        } else {                                                                
            result = result + separator + array[k];                    
        }  
    }    
       
    console.log("before base 64 " + result);
    return (new Buffer(result).toString('base64'));
}


function CaptainAmerica(secretPhrase,fibonacci){
	//Captain America
    var result = "";
    var separator;
    
    var nextFibonacci;
    var FibonacciFlag = -1;
    var resultVowelsFibonacci;

    var array =  secretPhrase;
    
    for (var i = 0; i < array.length; i++){
       array[i] = vowels(array[i]); 
        
    }
    
    array.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    array.reverse();
    
    
    for (var i = 0; i < array.length; i++){
        
        if(FibonacciFlag == -1){
           resultVowelsFibonacci = vowelsFibonacci(array[i],fibonacci,FibonacciFlag);
           FibonacciFlag = 0;
            
        }else {
           resultVowelsFibonacci = vowelsFibonacci(array[i],nextFibonacci,FibonacciFlag);
        }

        nextFibonacci = resultVowelsFibonacci[1];                        
        array[i] = resultVowelsFibonacci[0];
    }
    
    for (var i = 0; i < array.length; i++){            
        
        if (i == 0){
            separator = array[array.length-1].charCodeAt(0);
            result = array[i] + separator; 
        } else {
            separator = array[i-1].charCodeAt(0);
            result = result + array[i] + separator;               
        }                          
    }
      
    console.log("before base 64 " + result);
    
    
    return (new Buffer(result).toString('base64'));    
}

module.exports = secret;