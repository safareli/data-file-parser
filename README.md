[![NPM](https://nodei.co/npm/data-file-parser.png?downloads=true&stars=true)](https://nodei.co/npm/data-file-parser/)

# data-file-parser

> parse data from file using regular expression (regex)



## Getting Started
This plugin requires Grunt `~0.4.0`

you may install this module with this command:

```shell
npm install data-file-parser --save-dev
```

after instalation you can load it like so

```js
var dataFileParser = require('data-file-parser');
```

## dataFileParser.parse(params)

Returns: [Q](https://npmjs.org/package/q) promise object 

### options

#### in
Type: `String`  
Required

path to input file wich will be parsed

#### encoding
Type: `String`  
Default: `utf8`

encoding in which input file is written this option is passed to fs.readFile function

#### out
Type: `String`  
Required

path to output file in wich parsed data will be written

#### regex
Type: `RegExp`
Required
Example:/^([a-z]+) ([a-z]+)\. (.+)/gim,

using this regular expresion will be parsed input file. you should use at list one group in it.

#### as
Type: `String`  
Required
Example: 'word|type|desc'
it should contain keys (seperated using '|' ) of parsed data using thous keys will be generated date items in output.


#### var
Type: `String`  
Default: `false`

name of variable to wich parsed data vill be esigned and will be written. it should be saved as '*.js' file and then included using script tag so thet variable vill be available 



### Usage example

this is content of words.txt
```
abase v. To lower in position, estimation, or the like;
abbess n. The lady superior of a nunnery. 
abbey n. The group of buildings which collectively form the dwelling-place of a society of monks or nuns.
abbot n. The superior of a community of monks. 
abdicate v. To give up (royal power or the like). 
abdomen n. In mammals, the visceral cavity between the diaphragm and the pelvic floor; the belly. 
abdominal n. Of, pertaining to, or situated on the abdomen. 
abduction n. A carrying away of a person against his will, or illegally. 
```
this is index.js
```javascript
var dataParser = require('data-file-parser');
dataParser.parse({
    in: 'words.txt',    //input file
    out: 'words.js',    //output file
    var:'words',        //variable name
    // g for global 
    // i for ignore case
    // m fot ^ to be start of every line not whole string
    regex: /^([a-z\-]+) ([a-z]+)\. (.+)/gim,
    as:'word|type|desc' //object keys
}).then(function(arr){
    console.log(arr.length+" words");
})
```


so after runing it
```shell
node index.js
```


this will be in wors.js
```javascript
var words = [
    {
        "word": "abase",
        "type": "v",
        "desc": "To lower in position, estimation, or the like;"
    },
    {
        "word": "abbess",
        "type": "n",
        "desc": "The lady superior of a nunnery. "
    },
    {
        "word": "abbey",
        "type": "n",
        "desc": "The group of buildings which collectively form the dwelling-place of a society of monks or nuns."
    },
    {
        "word": "abbot",
        "type": "n",
        "desc": "The superior of a community of monks. "
    },
    {
        "word": "abdicate",
        "type": "v",
        "desc": "To give up (royal power or the like). "
    },
    {
        "word": "abdomen",
        "type": "n",
        "desc": "In mammals, the visceral cavity between the diaphragm and the pelvic floor; the belly. "
    },
    {
        "word": "abdominal",
        "type": "n",
        "desc": "Of, pertaining to, or situated on the abdomen. "
    },
    {
        "word": "abduction",
        "type": "n",
        "desc": "A carrying away of a person against his will, or illegally. "
    }
];
```


and it will be ready to use in your static web project or whatever
```html
// Project configuration.
<script src="words.js"></script>
<script>
    console.log(words.length);
</script>
```
 
## Release History
 * 2013-12-28   v0.0.2   add content to readme.md
 * 2013-12-28   v0.0.1   it just works :D

---

author [Irakli Safareli](http://safareli.tumblr.com)