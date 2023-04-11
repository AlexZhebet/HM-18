const form = document.querySelector(".form");
const box = document.querySelector(".post__box");
const buttonComment = document.querySelector(".button__comment");
const input = document.querySelector(".clas_input");
const commentW = document.querySelector(".comment");
const apiUrl = "https://jsonplaceholder.typicode.com/"; 

const createPostContainer = (title, body) => {
  const find = document.createElement("div");
  find.innerHTML = `
            <h2> Title is - ${title}</h2>
            <p> Body is - ${body}</p>
        `;
  return find;
};

const createPost = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    box.innerHTML = "";
    commentW.innerHTML = "";
    if (!input.value) return;
    fetch(`${apiUrl}posts/${input.value}`)
      .then((res) => {
        if (res.status <= 400) {
          return res.json();
        }
        return res.json().then((err) => {
          const e = new Error("Error");
          e.data = err;
          const error = document.createElement("div");
          error.innerHTML = `
            <h2> Error enter a number from 1 to 100 </h2>
            `;
            buttonComment.classList.remove("button__comment-active");
          box.appendChild(error);
          throw e;
        });
      })
      .then((post) => {
        const postDiv = createPostContainer(post.title, post.body);
        box.appendChild(postDiv);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

createPost();

const createCommentsContainer = (name, body) => {
  const commentBox = document.createElement("div");
  commentBox.innerHTML = `
        <h2> Comment: ${name}</h2>
        <p> Comment body: ${body}</p>
    `;

  return commentBox;
};

const createComments = () => {
    buttonComment.addEventListener("click", () => {
    commentW.innerHTML = "";
    fetch(`${apiUrl}posts/${input.value}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((comments) => {
        comments.forEach((comment) => {
          const commentBox = createCommentsContainer(
            comment.name,
            comment.body
          );
          commentW.appendChild(commentBox);
        });
        buttonComment.classList.add("button__comment-active"); 
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

createComments();
