export default class ConsoleNotifier{
  countNotification = 0;
  
  constructor(FileName = '') {
    this.filename = FileName
  }


  info(...messages){
    let ConsoleDrawItems = [{
      type: 'emoji',
      message: 'idea',
      style: 'background: #1890FF; font-size: 10px; padding: 5px 0 3px 5px; border-radius: 4px 0 0 4px'
    }, {
      type: 'text',
      message: `[Info: ${this.filename}]`,
      style: 'background: #1890FF; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
    }];
    if(messages.length === 1){
      ConsoleDrawItems.push({
        type: getType(messages[0]),
        message: messages[0],
        style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
      })
    } else {
      messages.forEach((message, index) => {
        if(index + 1 < messages.length){
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px;'
          }, {
            type: 'emoji',
            message: 'ice',
            style: 'background: #1890FF; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
          })
        } else {
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
          })
        }
      })
    }
    ConsoleDrawItems.push({
      type: 'text',
      message: `[time: ${getTime()}]`,
      style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; margin-left: 15px; border-radius:4px;'
    })

    DrawConsole(...ConsoleDrawItems)
    return this;
  }

  success(...messages){
    let ConsoleDrawItems = [{
      type: 'emoji',
      message: 'success',
      style: 'background: #313D49; font-size: 10px; padding: 5px 0 3px 5px; border-radius: 4px 0 0 4px'
    }, {
      type: 'text',
      message: `[Success: ${this.filename}]`,
      style: 'background: #313D49; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
    }];
    if(messages.length === 1){
      ConsoleDrawItems.push({
        type: getType(messages[0]),
        message: messages[0],
        style: 'background: #61b134; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
      })
    } else {
      messages.forEach((message, index) => {
        if(index + 1 < messages.length){
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #61b134; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px;'
          }, {
            type: 'text',
            message: '',
            style: 'background:  #313D49; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
          })
        } else {
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #61b134; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
          })
        }
      })
    }

    ConsoleDrawItems.push({
      type: 'text',
      message: `[time: ${getTime()}]`,
      style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; margin-left: 15px; border-radius:4px;'
    })
    DrawConsole(...ConsoleDrawItems)
    return this;
  }

  error(...messages){
    let ConsoleDrawItems = [{
      type: 'emoji',
      message: 'error',
      style: 'background: #313D49; font-size: 10px; padding: 5px 0 3px 5px; border-radius: 4px 0 0 4px'
    }, {
      type: 'text',
      message: `[Error: ${this.filename}]`,
      style: 'background: #313D49; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
    }];
    if(messages.length === 1){
      ConsoleDrawItems.push({
        type: getType(messages[0]),
        message: messages[0],
        style: 'background: #FF4D4F; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
      })
    } else {
      messages.forEach((message, index) => {
        if(index + 1 < messages.length){
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #FF4D4F; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px;'
          }, {
            type: 'text',
            message: '',
            style: 'background:  #313D49; color: #fff; font-size: 10px; padding: 5px 6px 3px 4px;'
          })
        } else {
          ConsoleDrawItems.push({
            type: getType(message),
            message: message,
            style: 'background: #FF4D4F; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; border-radius: 0 4px 4px 0'
          })
        }
      })
    }
    ConsoleDrawItems.push({
      type: 'text',
      message: `[time: ${getTime()}]`,
      style: 'background: #212A33; color: #fff; font-size: 10px; padding: 5px 4px 3px 6px; margin-left: 15px; border-radius:4px;'
    })
    DrawConsole(...ConsoleDrawItems)
    return this;
  }

  warn(message){
    DrawConsole({
      type: 'emoji',
      message: 'warn',
      style: 'background: #FACD23; font-size: 13px; padding: 4px 0 3px 5px; border-radius: 4px 0 0 4px'
    }, {
      type: 'text',
      message: `[WARN: ${this.filename}]`,
      style: 'background: #FACD23; color: #313D49; font-size: 13px; padding: 4px 4px 3px 4px; border-radius: 0 4px 4px 0'
    }, {
      type: getType(message),
      message: message,
      style: 'color: #212A33; font-size: 12px; padding-bottom: 6px; margin-left: 5px;'
    })
    return this;
  }

  variable(value, name, isReactive){
    DrawConsole({
      type: 'emoji',
      message: isReactive ? 'fast' : 'rapid',
      style: 'font-size: 14px; margin-right: 4px;'
    }, {
      type: 'text',
      message: `[Variable: ${name}]`,
      style: 'color: #1890FF; font-size: 13px; font-family: monospace;'
    }, {
      type: getType(value),
      message: value,
      style: 'background: #1890FF; color: #fff; font-size: 11px; padding: 2px 4px; margin-left: 5px; border-radius: 4px'
    })
    return this;
  }
}

function getType(_data){
  let type = typeof _data;
  if(type === 'string' && type === 'number') return 'text';
  if(type === 'object') return Array.isArray(type) ? 'array' : type;
  return type;
}

function DrawConsole() {
  let consoleVar = '', consoleBody = [];

  [].forEach.call(arguments, function (argument) {
    let _singleConsole = DrawSingleConsole(argument.type, argument.message, argument.style)
    consoleVar += _singleConsole.var;
    consoleBody.push(..._singleConsole.content);
  });

  console.log(consoleVar, ...consoleBody)
}

function DrawSingleConsole(type, message, style) {
  let _var = '%c', _message = message, _style = style;

  switch (type) {
    case 'emoji':
      _var += '%s';
      _message = DrawEmoji(_message);
      if(!_style) _style = 'background: #EEC421; font-size: 24px; padding: 4px 6px; border-radius: 50%;';
      break;
    default:
      _var += '%s'
  }

  return {
    var: _var,
    content: [_style, _message]
  }
}

function DrawEmoji(emojiName){
    switch (emojiName){
      case 'idea': return '💡';
      case 'rapid': return '🚀';
      case 'fast': return '🏎';
      case 'ice': return '🧊';
      case 'list': return '📋';
      case 'warn': return '🗿️';
      case 'success': return '✅';
      case 'error': return '⛔';
      case 'build': return '🛠';
    }
}

function getTime(){
  let date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
}

export {
  ConsoleNotifier, DrawConsole
}


