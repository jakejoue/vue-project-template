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
 * 过滤并排序
 * @param {Array.<Object>} src 源数组
 * @param {Array.<String>} sortArray 排序数组
 * @param {String} key 对应的排序字段
 * @example
 * const src = [{id:'name2'}, {id:'name1'}, {name:'tom'}];
 * const sortArray = ['name1', 'name2'];
 *
 * const retArray = filterSort(src, sortArray, 'id');
 * // retArray = [{id:'name1'}, {id:'name2'}];
 */
export function filterSort(src, sortArray = [], key = 'id') {
    if (typeOf(src) === 'array' && src.length) {
        return src
            .filter(c => sortArray.includes(c[key]))
            .sort(
                (pre, next) =>
                    sortArray.indexOf(pre[key]) - sortArray.indexOf(next[key])
            );
    }
    return [];
}

/**
 * 对象深层合并，数组简单的进行indexOf存在处理，不在
 * @param {Object} def
 * @param {Object} obj
 * @example
 * const def = {a: {b: 1}};
 * const obj = {a: {c: 2}};
 *
 * const dest = merge2Obj(def, obj);
 * // dest = {a: {b: 1, c: 2}}
 */
export function merge2Obj(def, obj) {
    if (!obj) {
        return def;
    } else if (!def) {
        return obj;
    }

    for (const i in obj) {
        // 如果是个对象
        if (obj[i] && obj[i].constructor == Object) {
            def[i] = merge2Obj(def[i], obj[i]);
        }
        // 如果是个数组
        else if (obj[i] && obj[i] instanceof Array) {
            // 如果def中当前属性不是个数组，不做处理
            if (def[i] && !(def[i] instanceof Array)) {
                continue;
            }
            // 如果def中不存在当前数组，简单复制
            else if (!def[i]) {
                def[i] = [...obj[i]];
                continue;
            }

            // 简单判断重复
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
 * @param {Object} src 原对象
 * @param {Object} templateObj 模板对象
 */
export function fixObj(src, templateObj) {
    // 非Object对象，返回deepCopy
    if (typeOf(templateObj) !== 'object') {
        return deepCopy(src);
    }
    // 补全不存在的值
    for (const key of Object.keys(templateObj)) {
        if (!hasOwnProperty(src, key)) {
            src[key] = deepCopy(templateObj[key]);
        }
    }
    // 删除非模板规定的配置项
    for (const key of Object.keys(src)) {
        if (!hasOwnProperty(templateObj, key)) {
            delete src[key];
        }
    }
    return src;
}

/**
 * 对象深复制
 * @param {*} data 要拷贝的对象
 * @param {Object} optOptions 可选配置项
 * @param {Array.<Function>} optOptions.valueProcessors 自定义对象赋值方法
 * @param {Array.<Function>} optOptions.keyProcessors 自定义对象键赋值方法
 * @param {Array.<String>} optOptions.ignores 不用拷贝的对象
 */
export function deepCopy(data, optOptions = {}) {
    const {
        valueProcessors = [],
        keyProcessors = [],
        ignores = [],
    } = optOptions;

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

/**
 * 继承获取属性对象的属性值
 *
 * @param {Object} dest 目标对象
 * @param {Array<?Object>} sources 获取的属性的对象
 */
export function extend(dest, ...sources) {
    for (const src of sources) {
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
}

/**
 * 从源对象中挑选指定的属性并返回新的对象
 *
 * @param {Object} src 源对象
 * @param {Array<string>} properties 被挑选的属性数组
 * @returns {Object}
 * @example
 * const foo = { name: 'Charlie', age: 10 };
 * const justName = pick(foo, ['name']);
 * // justName = { name: 'Charlie' }
 */
export function pick(src, properties) {
    const result = {};
    for (let i = 0; i < properties.length; i++) {
        const k = properties[i];
        if (k in src) {
            result[k] = src[k];
        }
    }
    return result;
}
