# Basic-Validator
Basic-Validator is a JavaScript library for value validation.
At first it was built to be used in **React-Final-Form**, 
but it is not limited to ***React*** and you can use it in every javascript project.

Basic-Validator contains some general Api to create your own **validation schema**.
If you want more, you can easily define your ```custom``` rule. 

For Persian users it fully supports **Shamsi** (Jalaali) date.

Also you can customize all messages or overwrite your message in every rule.



## CONTENT

1. [BasicValidator](#basicvalidator)
2. [Schema Builder](#schema-builder)
2. [API](#api)
3. [Custom Messages](#custom-messages)
4. [EXAMPLES](#examples)


## INSTALL
Install via npm:

```sh
npm install basic-validator
```

Basic-Validator supports Jalaali date validation that uses *Basic-Shamsi* package.

```sh
npm install basic-shamsi
```






## USAGE
Import ```BasicValidator``` class from the *Basic-Validator* package. 
```BasicValidator``` accepts an schema (or schema generator) as input argument and validate values.

### Define schema
Lets start with an example:
```js
import BasicValidator from 'basic-validator'

const myValidator = BasicValidator(builder => builder.object({
    userName: builder.label('First Name').string()
        .required()
        .userName(),

    password: builder.string()
        .required()
        .password(),

    confirmPassword: builder.string()
        .required()
        .equals(data => data.password, 'must be equal to password'),

    address: builder.object({
        city: builder.label('CITY').string()
            .required(),

        postalCode: builder.label('POSTAL CODE').string()
            .required()
            .digits()
    }).required()
}));
```

The above schema defines the following constraints:

* ```userName```
  * a required string
  * a valid username: may contains any symboles of _ – . \ / @ or digits or letters, having a length of 3 to 20 characters
* ```password```
  * a required string
  * requires a password rule: must not contains space and ' symbol, having a length of 3 to 20 characters
* ```confirmPassword```
  * a required string
  * must be equal to value of password field
* ```address```
  * a required object
* ```city```
  * a required string
* ```postalCode```
  * a required string
  * just contains digits

### Use in Fnal Form
You can easily use ```myValidator.validate``` in **React-Final-Form** .

```jsx
<Form
    onSubmit={onSubmit}
    validate={myValidator.validate}
    ...
/>
```

### Use in code

Also you can use ```myValidator``` in your code:

```js
const data = { userName: 'Mahdi', password: null, confirmPassword: '*' };
const errors = myValidator.validate( data );
/*
output:
    {
      userName: null,
      password: 'password is a required field',
      confirmPassword: 'must be equal to password',
      address: {
        city: 'CITY is a required field',
        postalCode: 'POSTAL CODE is a required field'
      }
    }
*/
```
Next section will explains more about ```BasicValidator```






## BasicValidator
```BasicValidator``` generates a schema using [schema builder](#schema-builder).

```js
const myValidator = BasicValidator( SCHEMA, CUSTOM_MESSAGES );

console.log( myValidator.vaidate( DATA ) )
console.log( myValidator.vaidateAll( DATA ) )
```

### Define schema
You can define your own schema using schema builder:
 
```js
const mySchema = builder => builder.object({
    userName: builder.string().required().notContains([" ","'"]),
    password: builder.string().required().notContains([" ","'"])
})

const myValidator = BasicValidator( mySchema );
...
```

### Validate values
```BasicValidator``` returns a validator object with folowing methods:

* ```isValid(value)```:
Returns ```true``` if the value matches the schema.

* ```validate(value)```
This method match the value and schema. For each schema class it will stop at first error.

* ```validateAll(value)```
This method match the value and schema. It checks all validation rules and extract all errors in each validation schema.








## Schema Builder
Helps you to define validation schema. It contains folowing methods:

* #### ```label( text )```
  Labels the name of property. Use this method when you are using [validator level](#custom-messages) messages.
  ```js
  builder => builder.label('User Name');
  ```

* #### ```string( message )```
  Generates an instance of ```StringSchema``` and also adds a rule that will be matched when value is undefined, null or string.
  ```js
  builder => builder.stirng('JUST STRING VALUE ALLOWED');
  ```
 
* #### ```inSensitive()```
  All string rules are case sensitive. Using this method right before string() method, makes them case in-sensitive.
  ```js
  builder => builder.inSensitive().stirng();
  ```
 
 
* #### ```number( message )```
  Generates an instance of ```NumberSchema``` and also adds a rule that will be matched when value is undefined, null or number.
  ```js
  builder => builder.number();
  ```
 
 
* #### ```bool( message )```
  Generates an instance of ```BooleanSchema``` and also adds a rule that will be matched when value is undefined, null or boolean.
  ```js
  builder => builder.bool();
  ```
 
 
* #### ```shamsi( message )```
  Generates an instance of ```ShamsiSchema``` and also adds a rule that will be matched when value is undefined, null or valid Shamsi (Jalaali) date.
  ```js
  builder => builder.shamsi();
  ```
 
  

* #### ```object( DEFINED-SCHEMA-OBJECT)```
  Generates an instance of ```ObjectSchema``` and also adds a rule that will be matched when value is undefined, null or object.
  ```js
  builder => builder.object( {} );
  ```
 
  








## API
There are 5 classes of schema ```StringSchema```, ```NumberSchema```, ```BooleanSchema```, ```ShamsiSchema``` and ```ObjectSchema```





### StringSchema
This schema class contains folowing methods:


  
* #### ```custom(fn, message)```
  Allows you to write your custom match function to validate a string.
This function takes 2 argument: the **value** (current evaluation value) and the **data** (current evaluation object)
  ```js
  var schema = builder => builder.string()
          .custom((value, data) => value > data.startDate, "CUSTOM ERROR MESSAGE"));
  ```
      Default vaildation error: DefaultMessages.Invalid



* #### ```required(message)```
  Will not allow undefined or null as value.
  ```js
  var schema = builder => builder.string()
        .required();
  ```
       Default vaildation error: DefaultMessages.Required
  


* #### ```equals(value, message)```
  Just the specified value is allwed.
  ```js
  var schema = builder => builder.string()
        .equals('Mahdi');
  ```

  Late binding: The ```value``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.object({
    ...
    confirmPassword: builder.string()
        .equals(data => data.password)
    ...
  });
  ```

      Default validation error: DefaultMessages.Equals
  


* #### ```notEquals(value, message)```
  The specified value is not allwed.
  ```js
  var schema = builder => builder.string()
        .notEquals('Mahdi');
  ```

  Late binding: The ```value``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.object({
        ...
        lastName: builder.string()
            .notEquals(data => data.firstName)
        ...
    });
  ```

       Default validation error: DefaultMessages.NotEquals



* #### ```email(message)```
  Requires the string value to be a valid email address.
  ```js
  var schema = builder => builder.string()
        .email();
  ```

       Default validation error: DefaultMessages.Email



* #### ```url(message)```
  Requires the string value to be a valid url address.
  ```js
  var schema = builder => builder.string()
        .url();
  ```

       Default validation error: DefaultMessages.Url



* #### ```match(regex, message)```
  Requires the ```regex``` pattern to match the string value.
  ```js
  var schema = builder => builder.string()
        .match(/^[0-9]+$/);
  ```

    Late binding: The ```regex``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .equals(data => data.typeId == 1? /^[0-9]+$/ : /^[a-zA-Z]+$/);
  ```

       Default validation error: DefaultMessages.Matches



* #### ```userName(message)```
  Requires the string value to be a valid user name (Contains any symboles of _ – . \ / @ or digits or letters, having a length of 3 to 20 characters) 
  ```js
  var schema = builder => builder.string()
        .userName();
  ```

       Default validation error: DefaultMessages.UserName



* #### ```strongPassword(message)```
  Requires the string value to be a strong password that has at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least **8** characters long.
  ```js
  var schema = builder => builder.string()
        .strongPassword();
  ```
       Default validation error: DefaultMessages.StrongPassword



* #### ```mediumPassword(message)```
  Requires the string value to be a medium password that has at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least **6** characters long.
  ```js
  var schema = builder => builder.string()
        .mediumPassword();
  ```
       Default validation error: DefaultMessages.MediumPassword


* #### ```password(message)```
  Requires the string value to be a valid password that has at 3 and characters and not contains space and ' (single quotation)
  ```js
  var schema = builder => builder.string()
        .password();
  ```

  This is a shortcut for ```.notContains([" ", "'"]).min(3).max(20)```.

* #### ```digits(message)```
  Requires the string value to only contain 0-9.
  ```js
  var schema = builder => builder.string()
        .digits();
  ```

       Default validation error: DefaultMessages.Digits

* #### ```letters(message)```
  Requires the string value to only contain a-z or A-Z.
  ```js
  var schema = builder => builder.string()
        .letters();
  ```
       Default validation error: DefaultMessages.Letters


* #### ```alphanum(message)```
  Requires the string value to only contain a-z, A-Z or 0-9.
  ```js
  var schema = builder => builder.string()
        .alphanum();
  ```
       Default validation error: DefaultMessages.AlphaNum



* #### ```min(min, message)```
  Specifies the minimum length limit for the string value.
  ```js
  var schema = builder => builder.string()
        .min(3);
  ```

    Late binding: The ```min``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .min(data => data.typeId == 1? 3 : 10);
  ```
       Default validation error: DefaultMessages.MinLen


* #### ```max(max, message)```
  Specifies the maximum length limit for the string value.
  ```js
  var schema = builder => builder.string()
        .max(3);
  ```

    Late binding: The ```max``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .max(data => data.typeId == 1? 3 : 10);
  ```
       Default validation error: DefaultMessages.MaxLen



* #### ```length(length, message)```
  Specifies the length limit for the string value.
  ```js
  var schema = builder => builder.string()
        .length(3);
  ```

    Late binding: The ```length``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .length(data => data.typeId == 1? 3 : 10);
  ```
       Default validation error: DefaultMessages.Length



* #### ```trim(message)```
  Requires the string value to be trimmed.
  ```js
  var schema = builder => builder.string()
        .trim();
  ```

       Default validation error: DefaultMessages.Trim



* #### ```lowerCase(lowerCase, message)```
  Requires the string value to be lowercase.
  ```js
  var schema = builder => builder.string()
        .lowerCase();
  ```

       Default validation error: DefaultMessages.LowerCase



* #### ```upperCase(upperCase, message)```
  Requires the string value to be uppercase.
  ```js
  var schema = builder => builder.string()
        .upperCase();
  ```
       Default validation error: DefaultMessages.UpperCase



* #### ```contains(values, message)```
  Requires the string value at least contains one of ```values```.
  ```js
  var schema = builder => builder.string()
        .contains(['US', 'UK']);
  ```

  Late binding: The ```values``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .contains(data => data.typeId == 1? ['US', 'UK'] : ['RUSSIA', 'CHINA']);
  ```

  Also the items of ```values``` can be a function.
  ```js
  var schema = builder => builder.string()
        .contains(['US', 'UK', data => data.typeId == 1?  'RUSSIA', 'CHINA']);
  ```

       Default validation error: DefaultMessages.Contains



* #### ```notContains(values, message)```
  Requires the string value does not contain any of ```values```.
  ```js
  var schema = builder => builder.string()
        .notContains(['RUSSIA', 'CHINA']);
  ```

  Late binding: The ```values``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .notContains(data => data.typeId == 1? ['US', 'UK'] : ['RUSSIA', 'CHINA']);
  ```

  Also the items of ```values``` can be a function.
  ```js
  var schema = builder => builder.string()
        .notContains(['US', 'UK', data => data.typeId == 1?  'RUSSIA', 'CHINA']);
  ```


      Default validation error: DefaultMessages.NotContains



* #### ```oneOf(values, message)```
  Requires the string value to be one of ```values```.
  ```js
  var schema = builder => builder.string()
        .oneOf(['RUSSIA', 'CHINA']);
  ```

  Late binding: The ```values``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .oneOf(data => data.typeId == 1? ['US', 'UK'] : ['RUSSIA', 'CHINA']);
  ```

  Also the items of ```values``` can be a function.
  ```js
  var schema = builder => builder.string()
        .oneOf(['US', 'UK', data => data.typeId == 1?  'RUSSIA', 'CHINA']);
  ```

     Default validation error: DefaultMessages.OneOf



* #### ```notOneOf(values, message)```
  Requires the string value not to be one of ```values```.
  ```js
  var schema = builder => builder.string()
        .notOneOf(['RUSSIA', 'CHINA']);
  ```

  Late binding: The ```values``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .notOneOf(data => data.typeId == 1? ['US', 'UK'] : ['RUSSIA', 'CHINA']);
  ```

  Also the items of ```values``` can be a function.
  ```js
  var schema = builder => builder.string()
        .notOneOf(['US', 'UK', data => data.typeId == 1?  'RUSSIA', 'CHINA']);
  ```

       Default validation error: DefaultMessages.NotOneOf














 
## NumberSchema
This class contains folowing methods:

  
* #### ```custom(fn, message)```
  Refer to [```string.custom()```](#customfn-message)


* #### ```required(message)```
  Refer to [```string.required()```](#requiredmessage)
  

* #### ```equals(value, message)```
  Refer to [```string.equals()```](#equalsvalue-message)



* #### ```notEquals(value, message)```
  Refer to [```string.notEquals()```](#notequalsvalue-message)


* #### ```integer(message)```
  Requires the value to be an *integer* or *null* or *undefined*
  ```js
  var schema = builder => builder.number()
        .integer();
  ```
      Default validation error: DefaultMessages.Integer


* #### ```min(min, message)```
  Set the minimum value allowed.
  ```js
  var schema = builder => builder.number()
      .min(5);
  ```

  Late binding: The ```min``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.number()
        .min(data => data.typeId == 1? 5 : 10);
  ```

      Default validation error: DefaultMessages.Min



* #### ```max(max, message)```
    Set the maximum value allowed.
  ```js
  var schema = builder => builder.number()
      .max(15);
  ```

  Late binding: The ```max``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.number()
        .max(data => data.typeId == 1? 15 : 10);
  ```

      Default validation error: DefaultMessages.Max



* #### ```lessThan(max, message)```
  Value must be less than ```max```.
  ```js
  var schema = builder => builder.number()
      .lessThan(15);
  ```

  Late binding: The ```max``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.number()
        .lessThan(data => data.typeId == 1? 15 : 10);
  ```

      Default validation error: DefaultMessages.LessThan


* #### ```moreThan(min, message)```
  Value must be more than ```min```.
  ```js
  var schema = builder => builder.number()
      .moreThan(5);
  ```

  Late binding: The ```min``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.number()
        .moreThan(data => data.typeId == 1? 5 : 10);
  ```

      Default validation error: DefaultMessages.MoreThan
  


* #### ```positive(message)```
  Value must be positive number.
  ```js
  var schema = builder => builder.number()
      .positive();
  ```
      Default validation error: DefaultMessages.Positive

  

* #### ```negative(message)```
  Value must be negative number.
  ```js
  var schema = builder => builder.number()
      .negative();
  ```
      Default validation error: DefaultMessages.Negative
  


* #### ```oneOf(values, message)```
  Refer to [```string.oneOf()```](#oneOfvalues-message)


* #### ```notOneOf(values, message)```
  Refer to [```string.notOneOf()```](#notOneOfvalues-message)











## BooleanSchema
This class contains folowing methods:

  
* #### ```custom(fn, message)```
  Refer to [```string.custom()```](#customfn-message)


* #### ```required(message)```
  Refer to [```string.required()```](#requiredmessage)
  

* #### ```equals(value, message)```
  Refer to [```string.equals()```](#equalsvalue-message)



* #### ```notEquals(value, message)```
  Refer to [```string.notEquals()```](#notequalsvalue-message)










## ShamsiSchema
This class contains folowing methods:

  
* #### ```custom(fn, message)```
  Refer to [```string.custom()```](#customfn-message)


* #### ```required(message)```
  Refer to [```string.required()```](#requiredmessage)
  

* #### ```equals(value, message)```
  Refer to [```string.equals()```](#equalsvalue-message)



* #### ```notEquals(value, message)```
  Refer to [```string.notEquals()```](#notequalsvalue-message)



* #### ```min(min, message)```
  Set the minimum Shamsi date allowed.
  ```js
  var schema = builder => builder.number()
      .min('1400/01/01');
  ```

  Late binding: The ```min``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .min(data => data.typeId == 1? '1400/01/01' : '1400/07/01');
  ```

      Default validation error: DefaultMessages.MinShamsi



* #### ```max(max, message)```
    Set the maximum Shamsi date allowed.
  ```js
  var schema = builder => builder.number()
      .max('1400/01/01');
  ```

  Late binding: The ```max``` argument can be a function, so it will be calculated each time it is accessed.
  ```js
  var schema = builder => builder.string()
        .max(data => data.typeId == 1? '1400/01/01' : '1400/07/01');
  ```

      Default validation error: DefaultMessages.MaxShamsi












## ObjectSchema
This class contains folowing methods:

* #### ```required(message)```
  Refer to [```string.required()```](#requiredmessage)
  









## Custom Messages
In ```BasicValidator``` you can custimize error messages in 2 ways.


 
### Rule Level
In each rule you can optinally define your error message.
```js
var schema = builder => builder
        .number('VALUE MUST BE A NUMBER')
        .required('CAN NOT BE EMPTY')
        .max(10, 'VALUE <= 10');
```



### Validator Level
Also you can customize all or some of messages in each validator.
You can find list of all messages in the file ```basic-validator/lib/messages.js```. like this:
```js
export const DefaultMessages = {
    Invalid: '{path} is invalid',
    Required: '{path} is a required field',
    Equals: '{path} field must be equal to {value}',
    NotEquals: '{path} field must be not equal to {value}',

    String: '{path} must be a string',
    Email: '{path} must be a valid email',
    Url: '{path} must be a valid URL',
    Matches: '{path} must match the following: "{regex}"',
    UserName: '{path} is not a valid user name',
    StrongPassword: '{path} is not a strong password',
    MediumPassword: '{path} is not a medium password',
    Digits: '{path} must contains only numbers"',
    Letters: '{path} must contains only letters"',
    AlphaNum: '{path} must contains letters or numbers"',

    MinLen: '{path} must be at least {min} characters',
    MaxLen: '{path} must be at most {max} characters',
    Length: '{path} must be exactly {length} characters',
    Trim: '{path} must be a trimmed string',
    LowerCase: '{path} must be a lowercase string',
    UpperCase: '{path} must be a upper case string',
    Contains: '{path} must contains one of the following values: {values}',
    NotContains: '{path} must not contains one of the following values: {values}',
    OneOf: '{path} must be one of the following values: {values}',
    NotOneOf: '{path} must not be one of the following values: {values}',

    Number: '{path} must be a number',
    Integer: '{path} must be an integer',
    Min: '{path} must be greater than or equal to {min}',
    Max: '{path} must be less than or equal to {max}',
    LessThan: '{path} must be less than {less}',
    MoreThan: '{path} must be greater than {more}',
    Positive: '{path} must be a positive number',
    Negative: '{path} must be a negative number',

    Boolean: '{path} field must be boolean',

    Shamsi: '{path} field must be Shamsi date',
    MinShamsi: '{path} field must be later than {min}',
    MaxShamsi: '{path} field must be at earlier than {max}',
}
```

Define your new messages and pass it as second argument in ```basic-validator```
```js
const MyValidatorMessages = {
    Required: 'CAN NOT BE EMPTY',
    Number: 'VALUE MUST BE A NUMBER',
    Max: 'VALUE <= {max}'
};

var mySchemaBuilder = builder => builder
        .number()
        .required()
        .max(10, '10');

const myValidator = BasicValidator( mySchemaBuilder,  MyValidatorMessages);
```

```Basic-Validator``` will use default message if you miss to overwrite it.











## EXAMPLES


#### Example 1: validate simple value
```js
const validator = BasicValidator(b => b.string().strongPassword());

validator.isValid("do,p!#32Z?")   // true
validator.isValid("123")          // false

validator.validate("do,p!#32Z?")  // null
validator.validate("do,p!#32Z?")  // ? is not a strong password
```


#### Example 2: password must not contains user name
```js
const validator = BasicValidator(b => b.object({
    ...
    userName: b.string().required(),
    password: b.inSensitive().string().required(),
        .notContains(d => d.userName, 'password must not contains user name'),
    ...
}));
```


#### Example 3: confirm password must be equal to password
```js
const validator = BasicValidator(b => b.object({
    ...
    password: b.string().required(),
    confirmPassword: b.string().required()
        .equals(d => d.password, 'must be equal to password'),
    ...
}));
```


#### Example 4: End date must be earlier than start date
```js
const validator = BasicValidator(b => b.object({
    ...
    startDate: b.shamsi().required(),
    endDate: b.shamsi().required()
        .moreThan(d => d.startDate, 'End date must be earlier than start date'),
    ...
}));
```

