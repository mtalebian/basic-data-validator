import { Shamsi } from 'basic-shamsi';
import { DefaultMessages } from './messages.js'


// eslint-disable-next-line
const EmailPattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

// eslint-disable-next-line
const UrlPattern = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// eslint-disable-next-line
const UserNamePattern = /^[a-zA-Z0-9@\\/_-]{3,20}$/;

// eslint-disable-next-line
const DigitsPattern = /^[0-9]+$/;

// eslint-disable-next-line
const LettersPattern = /^[a-zA-Z]+$/;

// eslint-disable-next-line
const AlphaNumPattern = /^[a-z0-9]+$/i;

// eslint-disable-next-line
const StrongPasswordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

// eslint-disable-next-line
const MediumPasswordPattern = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;




const Helper = {
    calcValue: (v, data) => typeof v === "function" ? v(data) : v,

    formatMessage: function (message, defaultMessage, args) {
        if (!message) message = defaultMessage;
        if (!args) return message;
        for (var propName in args) {
            message = message.replace("{" + propName + "}", args[propName]);
        }
        return message;
    },

    validateValue: function (rules, value, data, path) {
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (!rule.match(value, data)) {
                return Helper.formatMessage(this.calcValue(rule.message, data), null, { path });
            }
        }
        return null;
    },

    isEqual: function (value1, value2, caseSensitive) {
        if (!value1) return !!value2;
        if (!value2) return !!value1;
        if (typeof (value1) === "string" && !caseSensitive) {
            return value1.toLowerCase() === value2.toLowerCase();
        }
        return value1 === value2;
    },

    isOneOf: function (value, data, list, caseSensitive) {
        if (!value) return false;
        for (var i = 0; i < list.length; i++) {
            var v = Helper.calcValue(list[i], data)
            if (this.isEqual(v, value, caseSensitive)) return true;
        }
        return false;
    },

    contains: function (value, data, list, caseSensitive) {
        if (!value || typeof value != "string") return false;
        for (var i = 0; i < list.length; i++) {
            var v = Helper.calcValue(list[i], data)
            if (!!v) {
                var is_contains = caseSensitive ? value.indexOf(v) >= 0 : value.toLowerCase().indexOf(v.toLowerCase()) >= 0;
                if (is_contains) return true;
            }
        }
        return false;
    },

    csv: function (list, data) {
        var s = '';
        for (var i = 0; i < list.length; i++) {
            var v = Helper.calcValue(list[i], data);
            s += !!s ? ", " + v : v;
        }
        return s;
    },
}





class Rule {
    constructor({ id, match, message }) {
        this.id = id;
        this.match = match;
        this.message = message;
    }

    getMessage(value, data, path) {
        if (this.match(value, data)) return null;
        var msg = Helper.calcValue(this.message, data);
        if (!path) path = "?";
        return Helper.formatMessage(msg, null, { path });
    }
}


//-------
class BaseSchema {

    constructor(label, messages) {
        this.messages = messages ? messages : DefaultMessages;
        this.label = label;
        this.rules = [];
    }

    add(obj) {
        this.rules.push(new Rule(obj));
        return this;
    }

    custom(fn, message) {
        return this.add({
            id: "custom",
            message: Helper.formatMessage(message, this.messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
    }

    required(message) {
        return this.add({
            id: "required",
            message: Helper.formatMessage(message, this.messages.Required),
            match: value => typeof value !== "undefined" && value != null && value != ''
        })
    }

    equals(validValue, message) {
        return this.add({
            id: "equals",
            message: data => Helper.formatMessage(message, this.messages.Equals, { value: Helper.calcValue(validValue, data) }),
            match: (value, data) => value === Helper.calcValue(validValue, data)
        })
    }

    notEquals(validValue, message) {
        return this.add({
            id: "notEquals",
            message: data => Helper.formatMessage(message, this.messages.NotEquals, { value: Helper.calcValue(validValue, data) }),
            match: (value, data) => value === Helper.calcValue(validValue, data)
        })
    }

    getError(value, data, path) {
        for (let i = 0; i < this.rules.length; i++) {
            let error = this.rules[i].getMessage(value, data, path);
            if (!!error) return error;
        }
        return null;
    }

    getAllErrors(value, data, path) {
        let errors = [];
        for (var i = 0; i < rules.length; i++) {
            let error = this.rules[i].getMessage(value, data, path);
            if (!!error) errors.push(error);
        }
        return errors;
    }
}


//-------
class StringSchema extends BaseSchema {
    constructor(label, caseSensitive, stringmessage, messages) {
        super(label, messages)
        this.caseSensitive = caseSensitive;

        this.add({
            id: "string",
            message: Helper.formatMessage(stringmessage, this.messages.String),
            match: value => value == null || typeof value === "undefined" || typeof value === "string"
        })
    }

    email(message) {
        return this.add({
            id: "string.email",
            message: Helper.formatMessage(message, this.messages.Email),
            match: value => !value || EmailPattern.test(value)
        })
    }

    url(message) {
        return this.add({
            id: "string.url",
            message: Helper.formatMessage(message, this.messages.Url),
            match: value => !!value && UrlPattern.test(value)
        })
    }

    match(regex, message) {
        return this.add({
            id: "string.match",
            message: (data) => Helper.formatMessage(message, this.messages.Matches, { regex: Helper.calcValue(regex, data) }),
            match: (value, data) => !!value && Helper.calcValue(regex, data).test(value)
        })
    }

    userName(message) {
        return this.add({
            id: "string.userName",
            message: Helper.formatMessage(message, this.messages.UserName),
            match: value => !!value && UserNamePattern.test(value)
        })
    }

    strongPassword(message) {
        return this.add({
            id: "string.strongPassword",
            message: Helper.formatMessage(message, this.messages.StrongPassword),
            match: value => !!value && StrongPasswordPattern.test(value)
        })
    }

    mediumPassword(message) {
        return this.add({
            id: "string.mediumPassword",
            message: Helper.formatMessage(message, this.messages.MediumPassword),
            match: value => !!value && MediumPasswordPattern.test(value)
        })
    }

    password(message) {
        return this.notContains([" ", "'"], message).min(3, message).max(20, message);
    }

    digits(message) {
        return this.add({
            id: "string.digits",
            message: Helper.formatMessage(message, this.messages.Digits),
            match: value => !!value && DigitsPattern.test(value)
        })
    }

    letters(message) {
        return this.add({
            id: "string.letters",
            message: Helper.formatMessage(message, this.messages.Letters),
            match: value => !!value && LettersPattern.test(value)
        })
    }

    alphanum(message) {
        return this.add({
            id: "string.alphaNum",
            message: Helper.formatMessage(message, this.messages.AlphaNum),
            match: value => !!value && AlphaNumPattern.test(value)
        })
    }

    min(min, message) {
        return this.add({
            id: "string.min",
            message: data => Helper.formatMessage(message, this.messages.MinLen, { min: Helper.calcValue(min, data) }),
            match: (value, data) => !!value && value.length >= Helper.calcValue(min, data)
        })
    }

    max(max, message) {
        return this.add({
            id: "string.max",
            message: data => Helper.formatMessage(message, this.messages.MaxLen, { max: Helper.calcValue(max, data) }),
            match: (value, data) => !!value && value.length <= Helper.calcValue(max, data)
        })
    }

    length(length, message) {
        return this.add({
            id: "string.length",
            message: data => Helper.formatMessage(message, this.messages.Length, { length: Helper.calcValue(length, data) }),
            match: (value, data) => !!value && value.length === Helper.calcValue(length, data)
        })
    }

    trim(message) {
        return this.add({
            id: "string.trim",
            message: Helper.formatMessage(message, this.messages.Trim),
            match: value => !!value && value.trim && value.trim() === value
        })
    }

    lowerCase(message) {
        return this.add({
            id: "string.lowerCase",
            message: Helper.formatMessage(message, this.messages.LowerCase),
            match: value => !!value && value.toLowerCase && value.toLowerCase() === value
        })
    }

    upperCase(message) {
        return this.add({
            id: "string.upperCase",
            message: Helper.formatMessage(message, this.messages.UpperCase),
            match: value => !!value && value.toUpperCase && value.toUpperCase() === value
        })
    }

    contains(values, message) {
        return this.add({
            id: "string.contains",
            message: data => Helper.formatMessage(message, this.messages.Contains, { values: Helper.csv(values, data) }),
            match: (value, data) => {
                var the_values = Helper.calcValue(values, data);
                return !!value && Helper.contains(value, data, the_values, this.caseSensitive)
            }
        })
    }

    notContains(values, message) {
        return this.add({
            id: "string.notContains",
            message: data => Helper.formatMessage(message, this.messages.NotContains, { values: Helper.csv(values, data) }),
            match: (value, data) => {
                var the_values = Helper.calcValue(values, data);
                return !value || !Helper.contains(value, data, the_values, this.caseSensitive)
            }
        })
    }

    oneOf(values, message) {
        return this.add({
            id: "string.oneOf",
            message: data => Helper.formatMessage(message, this.messages.OneOf, { values: Helper.csv(values, data) }),
            match: (value, data) => {
                var the_values = Helper.calcValue(values, data);
                return !!value && Helper.isOneOf(value, data, the_values, this.caseSensitive)
            }
        })
    }

    notOneOf(values, message) {
        return this.add({
            id: "string.notOneOf",
            message: data => Helper.formatMessage(message, this.messages.NotOneOf, { values: Helper.csv(values, data) }),
            match: (value, data) => {
                var the_values = Helper.calcValue(values, data);
                return !value || !Helper.isOneOf(value, data, the_values, this.caseSensitive)
            }
        })
    }

}


//-------
class NumberSchema extends BaseSchema {
    constructor(label, numbermessage, messages) {
        super(label, messages)

        this.add({
            id: "number",
            message: Helper.formatMessage(numbermessage, this.messages.Number),
            match: value => value == null || typeof value === "undefined" || typeof value === "number"
        })
    }


    integer(message)   {
        return this.add({
            id: "number.integer",
            message: Helper.formatMessage(message, this.messages.Integer),
            match: value => !value || value === parseInt(value, 10)
        })
    }

    min(min, message) {
        return this.add({
            id: "number.min",
            message: data => Helper.formatMessage(message, this.messages.Min, { min: Helper.calcValue(min, data) }),
            match: (value, data) => !!value && (value * 1) >= Helper.calcValue(min, data)
        })
    }

    max(max, message) {
        return this.add({
            id: "number.max",
            message: data => Helper.formatMessage(message, this.messages.Max, { max: Helper.calcValue(max, data) }),
            match: (value, data) => !!value && (value * 1) <= Helper.calcValue(max, data)
        })
    }

    lessThan(max, message) {
        return this.add({
            id: "number.lessThan",
            message: data => Helper.formatMessage(message, this.messages.LessThan, { max: Helper.calcValue(max, data) }),
            match: (value, data) => !!value && (value * 1) < Helper.calcValue(max, data)
        })
    }

    moreThan(min, message) {
        return this.add({
            id: "number.moreThan",
            message: data => Helper.formatMessage(message, this.messages.MoreThan, { min: Helper.calcValue(min, data) }),
            match: (value, data) => !!value && (value * 1) > Helper.calcValue(min, data)
        })
    }

    positive(message) {
        return this.add({
            id: "number.positive",
            message: Helper.formatMessage(message, this.messages.Positive),
            match: value => !!value && (value * 1) > 0
        })
    }

    negative(message) {
        return this.add({
            id: "number.negative",
            message: Helper.formatMessage(message, this.messages.Negative),
            match: value => !!value && (value * 1) < 0
        })
    }

    oneOf(values, message) {
        return this.add({
            id: "number.oneOf",
            message: data => Helper.formatMessage(message, this.messages.OneOf, { values: Helper.csv(values, data) }),
            match: (value, data) => !!value && Helper.isOneOf(value, data, values, true)
        })
    }

    notOneOf(values, message) {
        return this.add({
            id: "number.notOneOf",
            message: data => Helper.formatMessage(message, this.messages.NotOneOf, { values: Helper.csv(values, data) }),
            match: (value, data) => !value || !Helper.isOneOf(value, data, values, true)
        })
    }
}



//-------
class BooleanSchema extends BaseSchema {
    constructor(label, boolMessage, messages) {
        super(label, messages);

        this.add({
            id: "bool",
            message: Helper.formatMessage(boolMessage, this.messages.Number),
            match: value => value == null || typeof value === "undefined" || typeof value === "boolean"
        })
    }

    required(message) {
        return this.add({
            id: "bool.required",
            message: Helper.formatMessage(message, this.messages.Required),
            match: value => value === false || value === true
        })
    }
}


//-------
class ShamsiSchema extends BaseSchema {

    constructor(label, shamsimessage, messages) {
        super(label, messages);

        this.add({
            id: "shamsi",
            message: Helper.formatMessage(shamsimessage, this.messages.Shamsi),
            match: value => !value || (value.length === 10 && Shamsi.isValid(value))
        })
    }

    min(min, message) {
        return this.add({
            id: "shamsi.min",
            message: data => Helper.formatMessage(message, this.messages.MinShamsi, { min: Helper.calcValue(min, data) }),
            match: (value, data) => !!value && value >= Helper.calcValue(min, data)
        })
    }

    max(max, message) {
        return this.add({
            id: "shamsi.max",
            message: data => Helper.formatMessage(message, this.messages.MaxShamsi, { max: Helper.calcValue(max, data) }),
            match: (value, data) => !!value && value <= Helper.calcValue(max, data)
        })
    }
}


//-------
class ObjectSchema extends BaseSchema {
    constructor(objectSchema, label, messages) {
        super(label, messages);
        this.nullabel = true;
        this.objectSchema = objectSchema;
    }

    required = function () {
        this.nullabel = false;
        return this;
    }

    getError(value, data, path) {
        let dotJoin = (a, b) => !!a && !!b ? a + '.' + b : (!!a ? a : b);
        let errors = {};
        if (!!this.label) path = this.label;
        for (let propName in this.objectSchema) {
            const propSchema = this.objectSchema[propName];
            //const value = !data ? null : data[propName];
            const propValue = !value ? null : value[propName];
            var propPath = propSchema.label ? propSchema.label : dotJoin(path, propName);

            if (!propSchema.getError) throw "BasicValidator: INVALID SCHEMA FOR PROPERTY '" + propName + "'";
            const ignore = !propValue && propSchema instanceof ObjectSchema && propSchema.nullabel;

            if (!ignore) {
                errors[propName] = propSchema.getError(propValue, value, propPath);
            }
        }
        return errors;
    }
}


//-------
function RuleBuilder({ label, caseSensitive, messages }) {
    var self = this;
    messages = { ...DefaultMessages, messages };
    return {
        label: function (text) { return new RuleBuilder({ label: text, caseSensitive, messages }); },
        inSensitive: function () { return new RuleBuilder({ label, caseSensitive: false, messages }); },
        string: function (stringMessage, caseSensitive) { return new StringSchema(label, caseSensitive, stringMessage, this.messages); },
        number: function (message) { return new NumberSchema(label, message, this.messages); },
        bool: function (message) { return new BooleanSchema(label, message, this.messages); },
        shamsi: function (message) { return new ShamsiSchema(label, message, this.messages); },
        object: function (schema) { return new ObjectSchema(schema, label, messages); }
    }
}


//-------
export default function BasicValidator(schema, messages, label) {
    if (typeof schema === "function") {
        var builder = new RuleBuilder({ label, caseSensitive: true, messages })
        schema = schema(builder);
    }

    return {

        validate: value => schema.getError(value),
        validateAll: value => schema.getAllErrors(value)
    }
}