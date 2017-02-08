const pino = require('pino');
const chalk = require('chalk');

const ctx = new chalk.constructor({
  enabled: !!(chalk.supportsColor)
});

const levelColors = {
  default: ctx.white,
  60: ctx.bgRed,
  50: ctx.red,
  40: ctx.yellow,
  30: ctx.green,
  20: ctx.blue,
  10: ctx.grey
};

const levels = {
  default: 'USERLVL',
  60: 'FATAL',
  50: 'ERROR',
  40: 'WARN',
  30: 'INFO',
  20: 'DEBUG',
  10: 'TRACE'
};

const standardKeys = [
  'pid',
  'hostname',
  'name',
  'level',
  'msg',
  'time',
  'v'
];

function withSpaces(value) {
  const lines = value.split('\n');
  for (let i = 1; i < lines.length; i += 1) {
    lines[i] = `    ${lines[i]}`;
  }
  return lines.join('\n');
}

function filter(value) {
  const keys = Object.keys(value);
  let result = '';

  for (let i = 0; i < keys.length; i += 1) {
    if (standardKeys.indexOf(keys[i]) < 0) {
      result += `    ${keys[i]}: ${withSpaces(JSON.stringify(value[keys[i]], null, 2))}\n`;
    }
  }

  return result;
}

function asColoredLevel(value) {
  if (levelColors.hasOwnProperty(value.level)) {
    return levelColors[value.level](levels[value.level]);
  }

  return levelColors.default(levels.default);
}

function asISODate(time) {
  return new Date(time).toISOString();
}

const name = 'express-api';

const pretty = pino.pretty({
  formatter: (value) => {
    let line = `[${asISODate(value.time)}] ${asColoredLevel(value)}`;
    line += ' (';
    line += `${name}/`;
    line += `${value.pid})`;
    line += ': ';
    if (value.msg) {
      line += ctx.cyan(value.msg);
    }
    line += '\n';
    if (value.type === 'Error') {
      line += `    ${withSpaces(value.stack)}\n`;
    } else {
      line += filter(value);
    }
    return line.replace(/\n+$/g, '');
  }
});

if (process.env.NODE_ENV !== 'test') {
  pretty.pipe(process.stdout);
}

const logger = pino({ name, level: 'debug', safe: true }, pretty);
module.exports = logger;
