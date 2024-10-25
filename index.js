//1. Функция создания HTML для поста
function createPostHTML(post) {
    return `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
  }
//2. Функция добавления поста в контейнер
function addPostToContainer(container, postHTML) {
  container.innerHTML += postHTML;
}
//3. Функция для создания поста с помощью POST-запроса
function createPost(title, body) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      serId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json()) // Преобразование ответа в JSON
  .then(post => {
    const postHTML = createPostHTML(post); // Создание HTML для нового поста
    const container = document.getElementById("postsContainer");
    addPostToContainer(container, postHTML); // Добавление нового поста на страницу
    // Очистка полей после отправки
    document.getElementById("postTitle").value = '';
    document.getElementById("postBody").value = '';
  })
  .catch(error => {
    console.error('Error creating post / Ошибка при создании поста:', error);
  });
}
//4. Добавление слушателя на кнопку "Создать пост"
document.getElementById("createPostButton").addEventListener("click", () => {
  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;
  if (title && body) {
    createPost(title, body); // Создание нового поста
  } else {
    alert('Please fill in all fields / Пожалуйста, заполните все поля.');
  }
});