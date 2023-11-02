// Декомпозиция - разделение проекта на маленькие шаги: рзбор проекта на мелкие шаги.


const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

let userDate = new Date();

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.querySelector('.validationMessage');
const titleLongMessage = document.querySelector('.titleLongMessage');
const textLongMessage = document.querySelector('.textLongMessage');


newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();// получение данных из поля ввода

    addPost(postFromUser);//Создать пост

    renderPosts();//Отображение поста
})

postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function validation() {
    const titleLenght = postTitleInputNode.value.length;
    const textLenght = postTextInputNode.value.length;

    if (titleLenght <= TITLE_VALIDATION_LIMIT) {
        titleLongMessage.innerText = `Осталось ${TITLE_VALIDATION_LIMIT - titleLenght} символов`;
        titleLongMessage.classList.remove('longMessage_hidden');
        titleLongMessage.classList.remove('longMessage_red');
    } else if (titleLenght > TITLE_VALIDATION_LIMIT) {
        titleLongMessage.innerText = `Лимит превышен на ${titleLenght - TITLE_VALIDATION_LIMIT} символов`;
        titleLongMessage.classList.add('longMessage_red');
    }

    if (textLenght <= TEXT_VALIDATION_LIMIT) {
        textLongMessage.innerText = `Осталось ${TEXT_VALIDATION_LIMIT - textLenght} символов`;
        textLongMessage.classList.remove('longMessage_hidden');
        textLongMessage.classList.remove('longMessage_red');
    } else if (textLenght > TEXT_VALIDATION_LIMIT) {
        textLongMessage.innerText = `Лимит превышен на ${textLenght - TEXT_VALIDATION_LIMIT} символов`;
        textLongMessage.classList.add('longMessage_red');
    }

    if (titleLenght > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove('validationMessage_hidden');
        newPostBtnNode.setAttribute('disabled', 'disabled');
        return;
    }

    if (textLenght > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Заголовок больше ${TEXT_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove('validationMessage_hidden');
        newPostBtnNode.setAttribute('disabled', 'disabled');
        return;
    }

    newPostBtnNode.removeAttribute('disabled', 'disabled');
    validationMessage.classList.add('validationMessage_hidden');
}


// получение данных из поля ввода
function getPostFromUser() {
    let date = getUserDate(userDate);
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    return {
        date: date,
        title: title,
        text: text,
    };
}

//Создать пост
function addPost({date, title, text}) {
    posts.push({
        date: date,
        title: title,
        text: text,
    }) // добавляем в массив элемент
}

function getPosts() {
    return posts;
}

//Отображение поста
function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML  += ` 
        <div class='post'>
            <p class='post__date'>${post.date}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>
    `;
    });

    postsNode.innerHTML = postsHTML;
}

function addZero(d) { //редактирование значений даты
    return (d < 10) ? '0' + d : d;
}

function getUserDate(userDate) { //получение даты
    let Y = userDate.getFullYear(); // Выводим год
    let M = addZero(userDate.getMonth() + 1); // Выводим месяц
    let D = addZero(userDate.getDate()); // Выводим число
    let h = addZero(userDate.getHours()); // Выводим Час
    let m = addZero(userDate.getMinutes()); // Выводим минуту

    return `${D}.${M}.${Y} ${h}:${m}`
}
