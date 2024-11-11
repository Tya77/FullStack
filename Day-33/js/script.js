const blogList = document.querySelector(".blog-wrapper");
const scrollWrap = document.querySelector(".scroll-wrapper");

const { PAGE_LIMIT } = config;

import { client } from "./client.js";
import { config } from "./config.js";
let page = 1;
let isLoading = false;

const render = (posts) => {
  posts.forEach((posts) => {
    const blog = document.createElement("div");
    blog.className = "blog";
    blog.innerHTML = `
      <div class="blog-img">
        <a href="#">
          <img src="${posts.image}" alt="" />
        </a>
      </div>
      <div class="blog-content">
        <h3>${posts.title}</h3>
        <p>${posts.excerpt}</p>
      </div>
    `;
    blogList.appendChild(blog);
  });
};

function loadMoreContent() {
  if (isLoading) return;
  isLoading = true;
  getPosts();
}

const getPosts = async () => {
  const { data } = await client.get(
    `/posts?_limit=${PAGE_LIMIT}&_page=${page}`
  );
  if (data.length > 0) {
    render(data);
    page++;
  } else {
    console.log("Không còn bài viết để tải");
  }
  isLoading = false;
};

scrollWrap.addEventListener("scroll", function () {
  const isAtBottom =
    scrollWrap.scrollTop + scrollWrap.clientHeight >=
    scrollWrap.scrollHeight - 100;
  if (isAtBottom && !isLoading) {
    loadMoreContent();
  }
});
getPosts();