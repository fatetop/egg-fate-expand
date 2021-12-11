const fs = require('fs');
const path = require('path');
const net = require('net');
const cluster = require('cluster');
const {
  isArray,
  isBoolean,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  // isObject,
  isDate,
  isError,
  isFunction,
  isPrimitive,
  isBuffer,
} = require('core-util-is');

const fsRmdir = promisify(fs.rmdir, fs);
const fsUnlink = promisify(fs.unlink, fs);
const fsReaddir = promisify(fs.readdir, fs);

const numberReg = /^((-?(\d+\.|\d+|\.\d)\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
const toString = Object.prototype.toString;

exports.isIP = net.isIP;
exports.isIPv4 = net.isIPv4;
exports.isIPv6 = net.isIPv6;
exports.isMaster = cluster.isMaster;

exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isNull = isNull;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isUndefined = isUndefined;
exports.isRegExp = isRegExp;
// exports.isObject = isObject;
exports.isDate = isDate;
exports.isError = isError;
exports.isFunction = isFunction;
exports.isPrimitive = isPrimitive;
exports.isBuffer = isBuffer;

/**
 * override isObject method in `core-util-is`
 * @param  {Mixed} obj []
 * @return {Boolean}     []
 */
exports.isObject = obj => {
  return toString.call(obj) === '[object Object]';
};

/**
 * check value is integer
 * @param {Mixed} value 入参
 * @return {Boolean} 返回
 */
function isInt(value) {
  if (isNaN(value) || exports.isString(value)) {
    return false;
  }
  return /^\d$/.test((value).toString());
}

exports.isInt = isInt;

/**
 * make callback function to promise
 * @param  {Function} fn       []
 * @param  {Object}   receiver []
 * @return {Promise}            []
 */
function promisify(fn, receiver) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [ ...args, (err, res) => {
        return err ? reject(err) : resolve(res);
      } ]);
    });
  };
}

exports.promisify = promisify;

/**
 * true empty
 * @param  {Mixed} obj []
 * @return {Boolean}     []
 */
function isTrueEmpty(obj) {
  if (obj === undefined || obj === null || obj === '') return true;
  if (exports.isNumber(obj) && isNaN(obj)) return true;
  return false;
}
exports.isTrueEmpty = isTrueEmpty;

/**
 * check object is empty
 * @param  {[Mixed]}  obj []
 * @return {Boolean}     []
 */
function isEmpty(obj) {
  if (isTrueEmpty(obj)) return true;
  if (exports.isRegExp(obj)) {
    return false;
  } else if (exports.isDate(obj)) {
    return false;
  } else if (exports.isError(obj)) {
    return false;
  } else if (exports.isArray(obj)) {
    return obj.length === 0;
  } else if (exports.isString(obj)) {
    return obj.length === 0;
  } else if (exports.isNumber(obj)) {
    return obj === 0;
  } else if (exports.isBoolean(obj)) {
    return !obj;
  } else if (exports.isObject(obj)) {
    for (const key in obj) {
      return false && key; // only for eslint
    }
    return true;
  }
  return false;
}
exports.isEmpty = isEmpty;

/**
 * check object is number string
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
function isNumberString(obj) {
  if (!obj) return false;
  return numberReg.test(obj);
}
exports.isNumberString = isNumberString;

/**
 * check path is exist
 * @param {string} dir 文件夹路径
 * @return {Boolean} 返回
 */
function isExist(dir) {
  dir = path.normalize(dir);
  try {
    fs.accessSync(dir, fs.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

exports.isExist = isExist;

/**
 * check filepath is file
 * @param {string} filePath 文件路径
 * @return {Boolean} 返回
 */
function isFile(filePath) {
  if (!isExist(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}
exports.isFile = isFile;

/**
 * check path is directory
 * @param {string} filePath 文件路径
 * @return {Boolean} 返回
 */
function isDirectory(filePath) {
  if (!isExist(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
}
exports.isDirectory = isDirectory;

/**
 * change path mode
 * @param  {String} p    [path]
 * @param  {String} mode [path mode]
 * @return {Boolean}      []
 */
function chmod(p, mode) {
  try {
    fs.chmodSync(p, mode);
    return true;
  } catch (e) {
    return false;
  }
}
exports.chmod = chmod;

/**
 * make dir
 * @param {string} dir 文件夹路径
 * @param {string} mode 文件权限
 * @return {Boolean} 返回
 */
function mkdir(dir, mode) {
  if (isExist(dir)) {
    if (mode) return chmod(dir, mode);
    return true;
  }
  const pp = path.dirname(dir);
  if (isExist(pp)) {
    try {
      fs.mkdirSync(dir, mode);
      return true;
    } catch (e) {
      return false;
    }
  }
  if (mkdir(pp, mode)) return mkdir(dir, mode);
  return false;
}
exports.mkdir = mkdir;

/**
 * get files in path
 * @param  {string} dir    []
 * @param  {string} prefix []
 * @return {string[]}        []
 */
function getDirFiles(dir, prefix = '') {
  dir = path.normalize(dir);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  let result = [];
  files.forEach(item => {
    const currentDir = path.join(dir, item);
    const stat = fs.statSync(currentDir);
    if (stat.isFile()) {
      result.push(path.join(prefix, item));
    } else if (stat.isDirectory()) {
      const cFiles = getDirFiles(currentDir, path.join(prefix, item));
      result = result.concat(cFiles);
    }
  });
  return result;
}
exports.getDirFiles = getDirFiles;

/**
 * remove dir aync
 * @param  {String} p       [path]
 * @param  {Boolean} reserve []
 * @return {Promise}         []
 */
function rmdir(p, reserve) {
  if (!isDirectory(p)) return Promise.resolve();
  return fsReaddir(p).then(files => {
    const promises = files.map(item => {
      const filepath = path.join(p, item);
      if (isDirectory(filepath)) return rmdir(filepath, false);
      return fsUnlink(filepath);
    });
    return Promise.all(promises).then(() => {
      if (!reserve) return fsRmdir(p);
    });
  });
}
exports.rmdir = rmdir;
