function showChat() {
    chatWindow = document.getElementById('chat');
  
    if (chatWindow.classList.contains('showing')) {
      chatWindow.classList.remove('showing');
    } else {
      chatWindow.classList.add('showing');
    }
}

function showUser() {
    userWindow = document.getElementById('players');
  
    if (userWindow.classList.contains('showing')) {
        userWindow.classList.remove('showing');
    } else {
        userWindow.classList.add('showing');
    }
}