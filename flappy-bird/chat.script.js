const socket = io("http://"+window.location.hostname+":3000");

function sendMessage(messageText) {
  let sendingUser = document.querySelector('#playerSelector').value;
  let message = { user: sendingUser, messageText: messageText }
  socket.emit('chat', message);
}

function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => { return map[m]; });
}

function formatMessage(msg) {
  const message = msg.textContent;
  let formattedMessage = escapeHTML(message);

  // Anchor links
  formattedMessage = formattedMessage.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$1">$2</a>');
  
  // Images
  formattedMessage = formattedMessage.replace(/\((.*?)\)\[(.*?)\]/g, '<img src="$1" height="200" alt="$2">');

  // Bold
  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Strikethrough
  formattedMessage = formattedMessage.replace(/~~(.*?)~~/g, '<del>$1</del>');
  
  // Underlined
  formattedMessage = formattedMessage.replace(/~(.*?)~/g, '<u>$1</u>');

  // Uppercase
  formattedMessage = formattedMessage.replace(/\+\+(.*?)\+\+/g, '<span style="text-transform: uppercase;">$1</span>');

  // Lowercase
  formattedMessage = formattedMessage.replace(/\+(.*?)\+/g, '<span style="text-transform: lowercase;">$1</span>');

  // Highlight
  formattedMessage = formattedMessage.replace(/`(.*?)`/g, '<span style="background-color: #357c38; border-radius: 5px; padding: 3px;">$1</span>');
  
  // Reverse
  formattedMessage = formattedMessage.replace(/--(.*?)--/g, (match, capturedText) => {
    return capturedText.split('').reverse().join('');
  });
  
  // Colorize
  formattedMessage = formattedMessage.replace(/\{(.*?)\}\((.*?)\)/g, '<span style="color: $1">$2</span>');
  
  // Superscript
  formattedMessage = formattedMessage.replace(/(?<!\s)\[#(.*?)\]/g, '<sup>$1</sup>');
  
  // Line break
  formattedMessage = formattedMessage.replace(/\\n/g, '<br>');

  msg.innerHTML = formattedMessage;
}

function clearChat() {
  const messages = msgPanel.querySelectorAll('div');
  let delay = 0;
  
  clear.setAttribute('disabled', '');

  messages.forEach((msg, index) => {
    setTimeout(() => {
      msg.style.marginRight = '-50px';
      msg.style.opacity = 0;
    }, delay);
    delay += 100;
  });

  setTimeout(() => {
    msgPanel.innerHTML = '';
    clear.removeAttribute('disabled');
  }, delay);
}

socket.on('chat', (message) => {
  const date = new Date();
  const msgPanel = document.querySelector('.msg-panel');
  const msg = document.createElement('div');
  msg.textContent = message.messageText;
  formatMessage(msg);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const timeString = date.toLocaleString('en-US', options);
  const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  msg.title = `${timeString} - ${dateString}`;
  msg.classList.add('msg');
  msg.classList.add('received');
  msgLabel = document.createElement('div');
  msgLabel.innerHTML = message.user + ' (' + message.socketId + ')' + ' - ' + dateString + ' at ' + timeString;
  msgLabel.classList.add('msg-label');

  if (message.type == 'scoreUpdate') {
    msg.classList.remove('received');
    msg.classList.add('status');
    msgLabel.style.marginTop = '12px';
  } else if (socket.id == message.socketId) {
    return;
  } 

  msgPanel.appendChild(msgLabel);
  msgPanel.appendChild(msg);

  setTimeout(() => {
    msg.style.marginTop = '7px';
    msg.style.opacity = 1;
    msgPanel.scrollTop = msgPanel.scrollHeight;
  });
});

document.addEventListener("DOMContentLoaded", function(event) { 
  const msgPanel = document.querySelector('.msg-panel');
  const input = document.querySelector('input');
  const submit = document.getElementById('submit');
  const clear = document.getElementById('clear');
  
  submit.addEventListener('click', () => {
    const date = new Date();
    const trimmedInputValue = input.value.trim();
    if (trimmedInputValue == '') {
      return;
    }

    sendMessage(trimmedInputValue);

    const msg = document.createElement('div');
    msg.textContent = trimmedInputValue;
    formatMessage(msg);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const timeString = date.toLocaleString('en-US', options);
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    msg.title = `${timeString} - ${dateString}`;
    msg.classList.add('msg');
    msgLabel = document.createElement('div');
    msgLabel.innerHTML =  'You - ' + dateString + ' at ' + timeString;
    msgLabel.classList.add('msg-label');
    msgPanel.appendChild(msgLabel);
    msgPanel.appendChild(msg);

    setTimeout(() => {
      msg.style.marginTop = '7px';
      msg.style.opacity = 1;
    });
    
    msg.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.which == 2 || e.which == 4) {
      msg.style.marginRight = '-50px';
      msg.style.opacity = 0;

      setTimeout(() => msg.remove(), 200);
    }
  });

    input.value = '';
    msgPanel.scrollTop = msgPanel.scrollHeight;
    submit.setAttribute('disabled', '');
  });

  input.addEventListener('input', () => {
    if (input.value != '') {
      submit.removeAttribute('disabled');
    } else {
      submit.setAttribute('disabled', '');
    }
  });

  clear.addEventListener('click', clearChat);

  input.addEventListener('keydown', e => {
    if (e.ctrlKey) {
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      const currentValue = input.value;

      if (e.key == 'b') { // Ctrl+B for bold
        e.preventDefault();
        if (startPos !== endPos) {
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `**${selectedText}**`;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 2;
          input.selectionEnd = endPos + 2;
        }
      } else if (e.key == 'i') { // Ctrl+I for italic
        e.preventDefault();
        if (startPos !== endPos) {
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `*${selectedText}*`;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 1;
          input.selectionEnd = endPos + 1;
        }
      } else if (e.key == 'u') { // Ctrl+U for underline
        e.preventDefault();
        if (startPos !== endPos) {
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `~${selectedText}~`;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 1;
          input.selectionEnd = endPos + 1;
        }
      } else if (e.key == 's') { // Ctrl+S for strikethrough
        e.preventDefault();
        if (startPos !== endPos) {
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `~~${selectedText}~~`;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 2;
          input.selectionEnd = endPos + 2;
        }
      } else if (e.key == 'h') { // Ctrl+H for highlight
        e.preventDefault();
        if (startPos !== endPos) {
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `\`${selectedText}\``;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 1;
          input.selectionEnd = endPos + 1;
        }
      } else if (e.key == 'r') { // Ctrl+R for reverse
          e.preventDefault();
          const selectedText = currentValue.substring(startPos, endPos);
          const modifiedText = `--${selectedText}--`;
          const newValue =
            currentValue.substring(0, startPos) +
            modifiedText +
            currentValue.substring(endPos);
          input.value = newValue;
          input.selectionStart = startPos + 1;
          input.selectionEnd = endPos + 1;
      }
    }
    
    if (e.shiftKey && e.key == 'Enter') {
      const caretStart = input.selectionStart;
      const caretEnd = input.selectionEnd;

      const currentValue = input.value;
      const newValue = `${currentValue.substring(0, caretStart)}\\n${currentValue.substring(caretEnd)}`;

      input.value = newValue;

      const newCaretPosition = caretStart + 2;
      input.setSelectionRange(newCaretPosition, newCaretPosition);
    }
    
    if (e.key == 'Backspace') {
      const currentValue = input.value;
      const caretStart = input.selectionStart;
      const caretEnd = input.selectionEnd;

      if (currentValue.substring(caretStart - 2, caretStart) === '\\n') {
        const newValue = currentValue.substring(0, caretStart - 1) + currentValue.substring(caretEnd);
        input.value = newValue;

        const newCaretPosition = caretStart - 1;
        input.setSelectionRange(newCaretPosition, newCaretPosition);
      }
    }
  });

  document.addEventListener('keyup', e => {
    if (!e.shiftKey && e.key == 'Enter') {
      submit.click();
    }
    if (e.altKey && e.key == 'c') {
      clearChat();
    }
  });
});