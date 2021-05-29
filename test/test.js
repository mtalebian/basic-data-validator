import BasicValidator from '../index.js'



var validator = BasicValidator(b => b.string().mediumPassword());
var error = validator.validate("aA");
console.log(JSON.stringify(error));



var cmdStatement = 'BasicValidator(builder => builder.object({ name: builder{name}}));'
var dataStatement = '({ name: {name},  family: "talebian" })';


console.log('\r\n--- STRING RULES ---\r\n');

test(cmdStatement, dataStatement, '.string().required()', 'null ', '"ali"');
test(cmdStatement, dataStatement, '.string().email()', '"a.a.com"', '"a@a.com"');
test(cmdStatement, dataStatement, '.string().url()', '"http://aaaaa"', '"http://a.com"');
test(cmdStatement, dataStatement, '.string().match(/^[a-z0-9]+$/i)', '"ali-reza"', '"ali"');
test(cmdStatement, dataStatement, '.string().min(4)', '"ali"     ', '"ali-reza"');
test(cmdStatement, dataStatement, '.string().max(4)', '"ali-reza"', '"ali"');
test(cmdStatement, dataStatement, '.string().length(3)', '"ali-reza"', '"ali"');
test(cmdStatement, dataStatement, '.string().trim()', '" ali-reza"', '"ali"');
test(cmdStatement, dataStatement, '.string().lowerCase()', '"Ali"', '"ali"');
test(cmdStatement, dataStatement, '.string().upperCase()', '"Ali"', '"ALI"');
test(cmdStatement, dataStatement, '.string().oneOf(["one", "two", "three"])', '"six"', '"one"');
test(cmdStatement, dataStatement, '.string().notOneOf(["one", "two", d => d.family])', '"talebian"', '"six"');
test(cmdStatement, dataStatement, '.string().notContains([" ", "?"])', '"Ali Reza"', '"AliReza"');

console.log('\r\n--- NUMBER RULES ---\r\n');
test(cmdStatement, dataStatement, '.number()', '"Ali"', '121');
test(cmdStatement, dataStatement, '.number().integer()', '1.1', '121');
test(cmdStatement, dataStatement, '.number().min(5)', '1', '11');
test(cmdStatement, dataStatement, '.number().max(10)', '11', '10');
test(cmdStatement, dataStatement, '.number().lessThan(10)', '10', '8');
test(cmdStatement, dataStatement, '.number().moreThan(10)', '10', '18');
test(cmdStatement, dataStatement, '.number().positive()', '-10', '180');
test(cmdStatement, dataStatement, '.number().negative()', '10', '-10');
test(cmdStatement, dataStatement, '.number().oneOf([4,8,12])', '10', '12');
test(cmdStatement, dataStatement, '.number().notOneOf([4,8,12])', '12', '10');

console.log('\r\n--- BOOLEAN RULES ---\r\n');
test(cmdStatement, dataStatement, '.bool()', '1   ', 'true');
test(cmdStatement, dataStatement, '.bool().required()', 'null', 'true');
test(cmdStatement, dataStatement, '.bool().equals(true)', 'false', 'true ');

console.log('\r\n--- SHAMSI RULES ---\r\n');
test(cmdStatement, dataStatement, '.shamsi()', '14000101    ', '"1400/01/01"');
test(cmdStatement, dataStatement, '.shamsi().required()', '""          ', '"1400/01/01"');
test(cmdStatement, dataStatement, '.shamsi().min("1400/06/01")', '"1400/01/01"', '"1400/12/01"');
test(cmdStatement, dataStatement, '.shamsi().max("1400/06/01")', '"1400/12/01"', '"1400/05/01"');


console.log('\r\n--- Object RULES ---\r\n');
test(cmdStatement, dataStatement, '.object({ firstName: builder.string().required() })', '{ firstName: null}  ', 'null                ');
test(cmdStatement, dataStatement, '.object({ firstName: builder.string().required() }).required()', 'null                 ', '{ firstName: "Ali" } ');



const myValidator = BasicValidator(builder => builder.object({
    userName: builder.label('First Name').string()
        .required()
        .userName(),

    password: builder.string()
        .required()
        .min(3)
        .max(20),

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

const data = { userName: 'Mahdi', password: '*aA12SCSA###sd', confirmPassword: '*aA12SCSA###sd', address: { city: 'aaa', postalCode: '' } };
console.log("***************");
console.log("\r\nmyValidator.isValid(data): ", myValidator.isValid(data));
console.log("\r\nmyValidator.validate(data): ", myValidator.validate(data));
console.log("\r\nmyValidator.validateAll(data): ", myValidator.validateAll(data));



function test(cmdStatement, dataStatement, cmd, data1, data2) {
    cmdStatement = cmdStatement.replace('{name}', cmd);
    var d1 = dataStatement.replace('{name}', data1);
    var d2 = dataStatement.replace('{name}', data2);

    var zvalidator = eval(cmdStatement);
    var zdata1 = eval(d1);
    var zdata2 = eval(d2);
    var errors1 = zvalidator.validate(zdata1);
    var errors2 = zvalidator.validate(zdata2);
    var ToStr = v => v == null ? "." : (typeof v === "string" ? v : JSON.stringify(v));

    console.log('' + cmd);
    console.log('      ' + data1 + '   ' + ToStr(errors1.name));
    console.log('      ' + data2 + '   ' + ToStr(errors2.name));

    if (errors2.name && !errors2.name.firstName) errors2.name = null;

    if (!errors1.name) {
        console.error("");
        console.error("**********************************************");
        console.error("VALIDATION ERROR FOR: " + cmd);
        console.error("                DATA: " + data1);
        console.error("              RESULT: " + errors1.name);
        console.error("**********************************************");
        console.error("");
    }
    if (!!errors2.name) {
        console.error("");
        console.error("**********************************************");
        console.error("VALIDATION ERROR FOR: " + cmd);
        console.error("                DATA: " + data2);
        console.error("              RESULT: " + errors2.name);
        console.error("**********************************************");
        console.error("");
    }
    console.log('');
    console.log('');
}
