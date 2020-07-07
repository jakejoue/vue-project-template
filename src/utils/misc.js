/**
 * typeOf
 * @param {Object} obj
 * @return {String}
 */
export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
}

/**
 * 判断是否存在一个属性
 * @param {Object} obj 对象
 * @param {String} key 是否存在键
 * @return {Boolean}
 */
export function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 过滤排序
 * @param {Array.<Object>} base 源数组
 * @param {Array.<String>} parm 排序数组
 * @param {String} key 对应的排序字段
 */
export function filterSort(base, parm = [], key = 'id') {
    if (typeOf(base) === 'array' && base.length) {
        return base
            .filter(c => parm.includes(c[key]))
            .sort((pre, next) => parm.indexOf(pre[key]) - parm.indexOf(next[key]));
    }
    return [];
}

/**
 * 对象深层合并
 * @param {Object} def
 * @param {Object} obj
 */
export function merge2Obj(def, obj) {
    if (!obj) {
        return def;
    } else if (!def) {
        return obj;
    }

    for (const i in obj) {
        // if its an object
        if (obj[i] && obj[i].constructor == Object) {
            def[i] = merge2Obj(def[i], obj[i]);
        }
        // if its an array.
        else if (obj[i] && obj[i] instanceof Array) {
            // if def its not an Array
            if (def[i] && !(def[i] instanceof Array)) {
                continue;
            }
            // if def array do not exist
            else if (!def[i]) def[i] = [];

            // simple copy
            for (let x = 0; x < obj[i].length; x++) {
                const idxObj = obj[i][x];
                if (def[i].indexOf(idxObj) === -1) {
                    def[i].push(idxObj);
                }
            }
        } else {
            def[i] = obj[i];
        }
    }

    return def;
}

/**
 * 多个对象深层合并
 * @param  {...any} rest
 */
export function mergeObjs(...rest) {
    return rest.reduce((preObj, currentObj) => merge2Obj(preObj, currentObj));
}

/**
 * 补全对象配置
 * @param {Object} config 原对象
 * @param {Object} templateObj 模板对象
 */
export function mergeConfig(config, templateObj) {
    // 非Object对象，返回deepCopy
    if (typeOf(templateObj) !== 'object') {
        return deepCopy(config);
    }
    for (const key of Object.keys(templateObj)) {
        if (!hasOwnProperty(config, key)) {
            config[key] = templateObj[key];
        }
    }
    for (const key of Object.keys(config)) {
        if (!hasOwnProperty(templateObj, key)) {
            delete config[key];
        }
    }
    return config;
}

/**
 * 对象深赋值
 * @param {*} data 要拷贝的对象
 * @param {Object} opt_options 可选配置项
 * @param {Array.<Function>} opt_options.valueProcessors 自定义对象赋值方法
 * @param {Array.<Function>} opt_options.keyProcessors 自定义对象键赋值方法
 * @param {Array.<String>} opt_options.ignores 不用拷贝的对象
 */
export function deepCopy(data, opt_options = {}) {
    const { valueProcessors = [], keyProcessors = [], ignores = [] } = opt_options;

    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(
                deepCopy(data[i], {
                    keyProcessors,
                    valueProcessors,
                    ignores,
                })
            );
        }
    } else if (t === 'object') {
        for (const i in data) {
            // ignores
            if (ignores.includes(i)) {
                o[i] = data[i];
                continue;
            }
            // key
            let key = i;
            keyProcessors.forEach(processor => {
                key = processor(key);
            });
            // data
            let _data = data[i];
            valueProcessors.forEach(processor => {
                _data = processor(_data, key);
            });
            // 已经处理过的数据，不再copy
            o[key] =
                _data === data[i]
                    ? deepCopy(_data, {
                          keyProcessors,
                          valueProcessors,
                          ignores,
                      })
                    : _data;
        }
    }
    return o;
}

/**
 * json深层转换
 * @param {*} json
 */
export function JSONParse(json) {
    if (typeOf(json) === 'object') {
        for (const key in json) {
            const item = json[key];
            json[key] = JSONParse(item);
        }
    }
    if (typeOf(json) === 'array') {
        for (let i = 0; i < json.length; i++) {
            const item = json[i];
            json[i] = JSONParse(item);
        }
    }
    if (typeOf(json) === 'string') {
        try {
            const parse = JSON.parse(json);
            if (typeOf(parse) === 'object' || typeOf(parse) === 'array') {
                json = JSONParse(parse);
            } else {
                return json;
            }
        } catch (error) {
            return json;
        }
    }
    return json;
}
