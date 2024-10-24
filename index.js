// Функция создания HTML для поста
function createPostHTML(post) {
    return `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
  }

  // Функция добавления поста в контейнер
  function addPostToContainer(container, postHTML) {
    container.innerHTML += postHTML;
  }

  // Функция для создания поста с помощью POST-запроса
  function createPost(title, body) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json()) // Преобразуем ответ в JSON
    .then(post => {
      const postHTML = createPostHTML(post); // Создаем HTML для нового поста
      const container = document.getElementById("postsContainer");
      addPostToContainer(container, postHTML); // Добавляем новый пост на страницу
    })
    .catch(error => {
      console.error('Ошибка при создании поста:', error);
    });
  }

  // Добавляем слушатель на кнопку "Создать пост"
  document.getElementById("createPostButton").addEventListener("click", () => {
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
    
    if (title && body) {
      createPost(title, body); // Создаем новый пост
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  });