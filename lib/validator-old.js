import { Shamsi } from 'basic-shamsi';
import { DefaultMessages } from './messages.js'


// eslint-disable-next-line
const EmailPattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

// eslint-disable-next-line
const UrlPattern = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// eslint-disable-next-line
const UserNamePattern = /^[a-zA-Z0-9_-]{3,20}$/;

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




const calcValue = (v, data) > typeof v === "function" ? v(data) : v;

function formatMessage(message, defaultMessage, args) {
    if (typeof message !== "string") return message;
    if (!message) message = defaultMessage;
    if (!args) return message;
    for (var propName in args) {
        message = message.replace("{" + propName + "}", args[propName]);
    }
    return message;
}





class Rule {
    constructor({ id, match, message }) {
        super()
        this.id = id;
        this.match = match;
        this.message = message;
    }

    getMessage(value, data, path) {
        if (this.match(value, data)) return null;
        var msg = calcValue(this.message, data);
        return formatMessage(msg, null, { path });
    }
}

class BaseSchema {

    constructor(label, messages) {
        this.messages = messages ? messages : DefaultMessages;
        this.label = label;
        this.rules = [];
    }

    add(rule) { this.rules.push(new Rule(obj)); return this; }

    custom(fn, message) {
        return add({
            id: "custom",
            message: formatMessage(message, messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
    }

    required(message) {
        return add({
            id: "custom",
            message: formatMessage(message, messages.Required),
            match: value => typeof value !== "undefined" && value != null && value != ''
        })
    }


    getError(value, data, path) {
        for (let i = 0; i < rules.length; i++) {
            let error = this.rules[i].getMessage(value, data, path);
            if (!!error) return;
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


class StringSchema extends BaseSchema {
    constructor(label, caseSensitive, stringMessage, messages) {
        super(label, messages)
        this.caseSensitive = caseSensitive;

        this.add({
            id: "string",
            message: formatMessage(stringMessage, messages.String),
            match: value => value == number || typeof value === "string"
        })
    }

    email(message) {
        return this.add({
            id: "string.email",
            message: formatMessage(message, messages.Email),
            match: value => !value || EmailPattern.test(value)
        })
    }

    url(message) {
        return this.add({
            id: "string.url",
            message: formatMessage(message, messages.Url),
            match: value => !!value && UrlPattern.test(value)
        })
    }

    match(regex, message) {
        return this.add({
            id: "string.match",
            message: (data) => formatMessage(message, messages.Matches, { regex: calcValue(regex, data) }),
            match: (value, data) => !!value && calcValue(regex, data).test(value)
        })
    }

    userName(message) {
        return this.add({
            id: "string.userName",
            message: formatMessage(message, messages.UserName),
            match: value => !!value && UserNamePattern.test(value)
        })
    }

    digits(message) {
        return this.add({
            id: "string.digits",
            message: formatMessage(message, messages.Digits),
            match: value => !!value && DigitsPattern.test(value)
        })
    }

    letters(message) {
        return this.add({
            id: "string.letters",
            message: formatMessage(message, messages.Letters),
            match: value => !!value && LettersPattern.test(value)
        })
    }

    alphaNum(message) {
        return this.add({
            id: "string.alphaNum",
            message: formatMessage(message, messages.AlphaNum),
            match: value => !!value && AlphaNumPattern.test(value)
        })
    }

    min(min, message) {
        return this.add({
            id: "string.min",
            message: data => formatMessage(message, messages.MinLen, { min: calcValue(min, data) }),
            match: (value, data) => !!value && value.length >= calcValue(min, data)
        })
    }

    max(max, message) {
        return this.add({
            id: "string.max",
            message: data => formatMessage(message, messages.MaxLen, { max: calcValue(max, data) }),
            match: (value, data) => !!value && value.length <= calcValue(max, data)
        })
    }

    length(length, message) {
        return this.add({
            id: "string.length",
            message: data => formatMessage(message, messages.Length, { length: calcValue(length, data) }),
            match: (value, data) => !!value && value.length === calcValue(length, data)
        })
    }

    trim(message) {
        return this.add({
            id: "string.trim",
            message: formatMessage(message, messages.Trim),
            match: value => !!value && value.trim && value.trim() === value
        })
    }

    lowerCase(message) {
        return this.add({
            id: "string.lowerCase",
            message: formatMessage(message, messages.LowerCase),
            match: value => !!value && value.toLowerCase && value.toLowerCase() === value
        })
    }

    upperCase(message) {
        return this.add({
            id: "string.upperCase",
            message: formatMessage(message, messages.UpperCase),
            match: value => !!value && value.toUpperCase && value.toUpperCase() === value
        })
    }

    contains(values, message) {
        return this.add({
            id: "string.contains",
            message: data => formatMessage(message, messages.Contains, { values: csv(values, data) }),
            match: (value, data) => !!value && isContains(value, data, values, caseSensitive)
        })
    }

    notContains(values, message) {
        return this.add({
            id: "string.notContains",
            message: data => formatMessage(message, messages.NotContains, { values: csv(values, data) }),
            match: (value, data) => !value || !isContains(value, data, values, caseSensitive)
        })
    }

    oneOf(values, message) {
        return this.add({
            id: "string.oneOf",
            message: data => formatMessage(message, messages.OneOf, { values: csv(values, data) }),
            match: (value, data) => !!value && isOneOf(value, data, values, caseSensitive)
        })
    }

    notOneOf(values, message) {
        return this.add({
            id: "string.notOneOf",
            message: data => formatMessage(message, messages.NotOneOf, { values: csv(values, data) }),
            match: (value, data) => !value || !isOneOf(value, data, values, caseSensitive)
        })
    }

}


class NumberSchema extends BaseSchema {
    constructor(label, numberMessage, messages) {
        super(label, messages)

        this.add({
            id: "string",
            message: formatMessage(numberMessage, messages.Number),
            match: value => value == null || typeof value === "number"
        })
    }


    integer (message) {
        rules.push({
            id: "number.integer",
            message: formatMessage(message, messages.Integer),
            match: value => !value || value === parseInt(value, 10)
        })
    }

    min (min, message) {
        return rules.push({
            id: "number.min",
            message: data => formatMessage(message, messages.Min, { min: calcValue(min, data) }),
            match: (value, data) => !!value && (value * 1) >= calcValue(min, data)
        })
    }

    max (max, message) {
        return rules.push({
            id: "number.max",
            message: data => formatMessage(message, messages.Max, { max: calcValue(max, data) }),
            match: (value, data) => !!value && (value * 1) <= calcValue(max, data)
        })
    }

    lessThan (less, message) {
       return rules.push({
            id: "number.lessThan",
            message: data => formatMessage(message, messages.LessThan, { less: calcValue(less, data) }),
            match: (value, data) => !!value && (value * 1) < calcValue(less, data)
        })
    }

    moreThan (more, message) {
        return rules.push({
            id: "number.moreThan",
            message: data => formatMessage(message, messages.MoreThan, { more: calcValue(more, data) }),
            match: (value, data) => !!value && (value * 1) > calcValue(more, data)
        })
    }

    positive (message) {
        rules.push({
            id: "number.positive",
            message: formatMessage(message, messages.Positive),
            match: value => !!value && (value * 1) > 0
        })
    }

    negative (message) {
        rules.push({
            id: "number.negative",
            message: formatMessage(message, messages.Negative),
            match: value => !!value && (value * 1) < 0
        })
    }

    oneOf (values, message) {
        rules.push({
            id: "number.oneOf",
            message: data => formatMessage(message, messages.OneOf, { values: csv(values, data) }),
            match: (value, data) => !!value && isOneOf(value, data, values, true)
        })
    }

    notOneOf (values, message) {
        rules.push({
            id: "number.notOneOf",
            message: data => formatMessage(message, messages.NotOneOf, { values: csv(values, data) }),
            match: (value, data) => !value || !isOneOf(value, data, values, true)
        })
    }

}







function validateValue(rules, value, data, path) {
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (!rule.match(value, data)) {
            return formatMessage(calcValue(rule.message, data), null, { path });
        }
    }
    return null;
}

function isEqual(value1, value2, caseSensitive) {
    if (!value1) return !!value2;
    if (!value2) return !!value1;
    if (typeof (value1) === "string" && !caseSensitive) {
        return value1.toLowerCase() === value2.toLowerCase();
    }
    return value1 === value2;
}

function isOneOf(value, data, list, caseSensitive) {
    if (!value) return false;
    for (var i = 0; i < list.length; i++) {
        var v = calcValue(list[i], data)
        if (isEqual(v, value, caseSensitive)) return true;
    }
    return false;
}

function isContains(value, data, list, caseSensitive) {
    if (!value || typeof value != "string") return false;
    for (var i = 0; i < list.length; i++) {
        var v = calcValue(list[i], data)
        if (!!v) {
            if (caseSensitive) return value.indexOf(v) >= 0;
            return value.toLowerCase().indexOf(v.toLowerCase()) >= 0;
        }
    }
    return false;
}

function csv(list, data) {
    var s = '';
    for (var i = 0; i < list.length; i++) {
        var v = calcValue(list[i], data);
        s += !!s ? ", " + v : v;
    }
    return s;
}



//-------
function StringRules(label, caseSensitive, messages) {
    var self = this;
    self.label = label;
    self.rules = [];

    if (typeof (caseSensitive) === "undefined") caseSensitive = true;


    self.custom = function (fn, message) {
        self.rules.push({
            id: "string.custom",
            message: formatMessage(message, messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
        return self;
    };

    self.required = function (message) {
        self.rules.push({
            id: "string.required",
            message: formatMessage(message, messages.Required),
            match: value => !!value
        });
        return self;
    };

    self.email = function (message) {
        self.rules.push({
            id: "string.email",
            message: formatMessage(message, messages.Email),
            match: value => !!value && EmailPattern.test(value)
        });
        return self;
    };

    self.url = function (message) {
        self.rules.push({
            id: "string.url",
            message: formatMessage(message, messages.Url),
            match: value => !!value && UrlPattern.test(value)
        });
        return self;
    };

    self.match = function (regex, message) {
        self.rules.push({
            id: "string.match",
            message: (data) => formatMessage(message, messages.Matches, { regex: calcValue(regex, data) }),
            match: (value, data) => !!value && calcValue(regex, data).test(value)
        });
        return self;
    };


    self.userName = function (message) {
        self.rules.push({
            id: "string.userName",
            message: formatMessage(message, messages.UserName),
            match: value => !!value && UserNamePattern.test(value)
        });
        return self;
    };

    self.digits = function (message) {
        self.rules.push({
            id: "string.digits",
            message: formatMessage(message, messages.Digits),
            match: value => !!value && DigitsPattern.test(value)
        });
        return self;
    };

    self.letters = function (message) {
        self.rules.push({
            id: "string.letters",
            message: formatMessage(message, messages.Letters),
            match: value => !!value && LettersPattern.test(value)
        });
        return self;
    };

    self.alphaNum = function (message) {
        self.rules.push({
            id: "string.alphaNum",
            message: formatMessage(message, messages.AlphaNum),
            match: value => !!value && AlphaNumPattern.test(value)
        });
        return self;
    };

    self.min = function (min, message) {
        self.rules.push({
            id: "string.min",
            message: data => formatMessage(message, messages.MinLen, { min: calcValue(min, data) }),
            match: (value, data) => !!value && value.length >= calcValue(min, data)
        });
        return self;
    };

    self.max = function (max, message) {
        self.rules.push({
            id: "string.max",
            message: data => formatMessage(message, messages.MaxLen, { max: calcValue(max, data) }),
            match: (value, data) => !!value && value.length <= calcValue(max, data)
        });
        return self;
    };

    self.length = function (length, message) {
        self.rules.push({
            id: "string.length",
            message: data => formatMessage(message, messages.Length, { length: calcValue(length, data) }),
            match: (value, data) => !!value && value.length === calcValue(length, data)
        });
        return self;
    };

    self.trim = function (message) {
        self.rules.push({
            id: "string.trim",
            message: formatMessage(message, messages.Trim),
            match: value => !!value && value.trim && value.trim() === value
        });
        return self;
    };

    self.lowerCase = function (message) {
        self.rules.push({
            id: "string.lowerCase",
            message: formatMessage(message, messages.LowerCase),
            match: value => !!value && value.toLowerCase && value.toLowerCase() === value
        });
        return self;
    };

    self.upperCase = function (message) {
        self.rules.push({
            id: "string.upperCase",
            message: formatMessage(message, messages.UpperCase),
            match: value => !!value && value.toUpperCase && value.toUpperCase() === value
        });
        return self;
    };

    self.contains = function (values, message) {
        self.rules.push({
            id: "string.contains",
            message: data => formatMessage(message, messages.Contains, { values: csv(values, data) }),
            match: (value, data) => !!value && isContains(value, data, values, caseSensitive)
        });
        return self;
    };

    self.notContains = function (values, message) {
        self.rules.push({
            id: "string.notContains",
            message: data => formatMessage(message, messages.NotContains, { values: csv(values, data) }),
            match: (value, data) => !value || !isContains(value, data, values, caseSensitive)
        });
        return self;
    };

    self.oneOf = function (values, message) {
        self.rules.push({
            id: "string.oneOf",
            message: data => formatMessage(message, messages.OneOf, { values: csv(values, data) }),
            match: (value, data) => !!value && isOneOf(value, data, values, caseSensitive)
        });
        return self;
    };

    self.notOneOf = function (values, message) {
        self.rules.push({
            id: "string.notOneOf",
            message: data => formatMessage(message, messages.NotOneOf, { values: csv(values, data) }),
            match: (value, data) => !value || !isOneOf(value, data, values, caseSensitive)
        });
        return self;
    };

    self.rules.push({
        id: "string",
        message: formatMessage(numberMessage, messages.String),
        match: value => !value || typeof value === "string"
    })
}

//-------
function NumberRules(label, numberMessage, messages) {
    var self = this;
    self.label = label;
    self.rules = [];

    self.custom = function (fn, message) {
        self.rules.push({
            id: "number.custom",
            message: formatMessage(message, messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
        return self;
    };

    self.required = function (message) {
        self.rules.push({
            id: "number.required",
            message: formatMessage(message, messages.Required),
            match: value => !!value || value === 0
        });
        return self;
    };

    self.integer = function (message) {
        self.rules.push({
            id: "number.integer",
            message: formatMessage(message, messages.Integer),
            match: value => !value || value === parseInt(value, 10)
        });
        return self;
    };

    self.min = function (min, message) {
        self.rules.push({
            id: "number.min",
            message: data => formatMessage(message, messages.Min, { min: calcValue(min, data) }),
            match: (value, data) => !!value && (value * 1) >= calcValue(min, data)
        });
        return self;
    };

    self.max = function (max, message) {
        self.rules.push({
            id: "number.max",
            message: data => formatMessage(message, messages.Max, { max: calcValue(max, data) }),
            match: (value, data) => !!value && (value * 1) <= calcValue(max, data)
        });
        return self;
    };

    self.lessThan = function (less, message) {
        self.rules.push({
            id: "number.lessThan",
            message: data => formatMessage(message, messages.LessThan, { less: calcValue(less, data) }),
            match: (value, data) => !!value && (value * 1) < calcValue(less, data)
        });
        return self;
    };

    self.moreThan = function (more, message) {
        self.rules.push({
            id: "number.moreThan",
            message: data => formatMessage(message, messages.MoreThan, { more: calcValue(more, data) }),
            match: (value, data) => !!value && (value * 1) > calcValue(more, data)
        });
        return self;
    };

    self.positive = function (message) {
        self.rules.push({
            id: "number.positive",
            message: formatMessage(message, messages.Positive),
            match: value => !!value && (value * 1) > 0
        });
        return self;
    };

    self.negative = function (message) {
        self.rules.push({
            id: "number.negative",
            message: formatMessage(message, messages.Negative),
            match: value => !!value && (value * 1) < 0
        });
        return self;
    };

    self.oneOf = function (values, message) {
        self.rules.push({
            id: "number.oneOf",
            message: data => formatMessage(message, messages.OneOf, { values: csv(values, data) }),
            match: (value, data) => !!value && isOneOf(value, data, values, true)
        });
        return self;
    };

    self.notOneOf = function (values, message) {
        self.rules.push({
            id: "number.notOneOf",
            message: data => formatMessage(message, messages.NotOneOf, { values: csv(values, data) }),
            match: (value, data) => !value || !isOneOf(value, data, values, true)
        });
        return self;
    };

    self.rules.push({
        id: "number",
        message: formatMessage(numberMessage, messages.Number),
        match: value => !value || (value * 1) === value
    });
}

//-------
function BooleanRules(label, boolMessage, messages) {
    var self = this;
    self.label = label;
    self.rules = [];

    self.custom = function (fn, message) {
        self.rules.push({
            id: "bool.custom",
            message: formatMessage(message, messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
        return self;
    };

    self.required = function (message) {
        self.rules.push({
            id: "bool.required",
            message: formatMessage(message, messages.Required),
            match: value => value === false || value === true
        });
        return self;
    };

    self.isValue = function (validValue, message) {
        self.rules.push({
            id: "bool.isValue",
            message: data => formatMessage(message, messages.IsValue, { value: calcValue(validValue, data) }),
            match: (value, data) => value === calcValue(validValue, data)
        });
        return self;
    };

    self.rules.push({
        id: "bool",
        message: formatMessage(boolMessage, messages.Boolean),
        match: value => !value || typeof (value) === "boolean"
    });
}

//-------
function ShamsiRules(label, shamsiMessage, messages) {
    var self = this;
    self.label = label;
    self.rules = [];

    self.custom = function (fn, message) {
        self.rules.push({
            id: "shamsi.custom",
            message: formatMessage(message, messages.Invalid),
            match: (value, data) => !!value && fn(value, data)
        });
        return self;
    };

    self.required = function (message) {
        self.rules.push({
            id: "shamsi.required",
            message: formatMessage(message, messages.Required),
            match: value => !!value
        });
        return self;
    };

    self.min = function (min, message) {
        self.rules.push({
            id: "shamsi.min",
            message: data => formatMessage(message, messages.MinShamsi, { min: calcValue(min, data) }),
            match: (value, data) => !!value && value >= calcValue(min, data)
        });
        return self;
    };

    self.max = function (max, message) {
        self.rules.push({
            id: "shamsi.max",
            message: data => formatMessage(message, messages.MaxShamsi, { max: calcValue(max, data) }),
            match: (value, data) => !!value && value <= calcValue(max, data)
        });
        return self;
    };


    return rules.push({
        id: "shamsi",
        message: formatMessage(shamsiMessage, messages.Shamsi),
        match: value => !value || (value.length === 10 && Shamsi.isValid(value))
    })
}

//-------
function ObjectRules(label, objectSchema) {
    var self = this;
    self.nullabel = true;

    self.required = function () {
        self.nullabel = false;
        return self;
    }

    self.execute = (data, parentPath) => {
        let dotJoin = (a, b) => !!a && !!b ? a + '.' + b : (!!a ? a : b);
        let errors = {};
        if (!!label) parentPath = label;
        for (let propName in objectSchema) {
            const propSchema = objectSchema[propName];
            const path = propSchema.label ? propSchema.label : dotJoin(parentPath, propName);
            const value = !data ? null : data[propName];

            if (propSchema.execute) {
                if (!propSchema.nullabel || !!value) {
                    errors[propName] = propSchema.execute(value, path);
                }
            }
            else {
                if (typeof propSchema === "string") throw "BasicValidator: INVALID SCHEMA FOR PROPERTY '" + propName + "'";
                errors[propName] = validateValue(propSchema.rules, value, data, path);
            }
        }
        return errors;
    }
}


//-------
function RuleBuilder({ label, caseSensitive, messages }) {
    var self = this;
    self.label = function (text) { return new RuleBuilder({ label: text, caseSensitive, messages }); }
    self.inSensitive = function () { return new RuleBuilder({ label, caseSensitive: false, messages }); }
    self.string = function (stringMessage, caseSensitive) { return new StringRules(label, caseSensitive, stringMessage, messages); }
    self.number = function (message) { return new NumberRules(label, message, messages); }
    self.bool = function (message) { return new BooleanRules(label, message, messages); }
    self.shamsi = function (message) { return new ShamsiRules(label, message, messages); }
    self.object = function (schema) { return new ObjectRules(label, schema, messages); }
}


//-------
export default function BasicValidator(objectBuilder, messages, label) {
    messages = { ...DefaultMessages, messages };
    var objectSchema = objectBuilder(new RuleBuilder({ label, caseSensitive: true, messages }));
    var objectRuleSet = new ObjectRules(label, objectSchema);

    return function (data) {
        try {
            return objectRuleSet.execute(data, label);
        } catch (e) {
            console.error(e);
        }
    }

}