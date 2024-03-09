//

let count = 0;

//

const postContainer = document.querySelector("#discuss__container");
const readContainer = document.querySelector("#read__container");
const markCount = document.querySelector("#mark__count");
const latestContainer = document.querySelector("#post__container");
const loading = document.querySelector("#loading__spinner");

//
const getPost = async (value) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
  );
  const data = await res.json();
  postContainer.textContent = "";
  // readContainer.classList.add("hidden");
  loading.classList.remove("hidden");
  setTimeout(function () {
    data.posts.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="w-full mb-6 rounded-xl bg-[#797DFC1A] p-9 flex gap-8">
      <div class="relative">
          <div class="w-16 h-16 rounded-lg flex items-center justify-center">
              <img class="w-full rounded-lg" src="${post.image}" alt="">
          </div>
          <div id="active__status" class="p-2 bg-green-600 rounded-full absolute -right-2 -top-2"></div>
      </div>
      <div class="discuss__container w-full">
          <div class="flex items-center gap-8">
              <span class="text-base font-bold text-[#12132DCC]">${post.category}</span>
              <div>
                  <span class="text-base font-bold text-[#12132DCC]">Author : </span>
                  <span class="text-base font-bold text-[#12132DCC]">${post.author.name}</span>
              </div>
          </div>
          <h3 class="text-xl font-bold text-[#12132D] mt-3">${post.title}</h3>
          <p class="text-base text-[#12132D99] font-medium mt-3">${post.description}</p>
          <hr class="mt-5 border-t-[2px] border-dashed border-[#12132D40]">
          <div class="flex items-center justify-between mt-6">
              <div class="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4">
                  <div class="flex items-center gap-2">
                      <i class="ri-message-3-line text-2xl text-[#12132D99]"></i>
                      <span class="text-base text-[#12132D99]">${post.comment_count}</span>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="ri-eye-line text-2xl text-[#12132D99]"></i>
                      <span class="text-base text-[#12132D99]">${post.view_count}</span>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="ri-time-line text-2xl text-[#12132D99]"></i>
                      <span class="text-base text-[#12132D99]">${post.posted_time} min</span>
                  </div>
              </div>
              <div onclick="addToRead('${post.title}', '${post.view_count}')" id="add__btn" class="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 cursor-pointer">
                  <i class="ri-mail-open-fill text-2xl text-[#fff]"></i>
              </div>
          </div>
      </div>
      </div>`;
      postContainer.appendChild(div);
      loading.classList.add("hidden");
    });
  }, 2000);
};

const addToRead = (title, view) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="flex items-center justify-between bg-white mt-5 rounded-lg p-4">
    <h4 class="text-[1rem] font-semibold text-[#12132D]">${title}</h4>
    <div class="flex items-center justify-between gap-1">
      <i class="ri-eye-line text-[#12132D99]"></i>
      <span class="text-base font-normal text-[#12132D99]">${view}</span>
    </div>
    </div>`;
  readContainer.appendChild(div);
  count++;
  markCount.innerText = count;
  // readContainer.classList.remove("hidden");
};

const handleSearch = () => {
  const inputField = document.querySelector("#input__field");
  const value = inputField.value;
  getPost(value);
  inputField.value = "";
};

const getLatestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  data.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-6 rounded-3xl border-[2px] border-[#0307121A]">
    <img class="w-full rounded-2xl" src="${post.cover_image}" alt="">
    <div class="flex items-center gap-2 mt-6">
        <i class="ri-calendar-2-line text-[#12132D99] text-xl"></i>
        <span class="text-base font-normal text-[#12132D99]">${
          post.author.posted_date ? post.author.posted_date : "No Publish Date"
        }</span>
    </div>
    <h3 class="text-[#12132D] text-xl font-extrabold mt-2">${post.title.slice(
      0,
      30
    )}</h3>
    <p class="text-base text-[#12132D99] font-normal mt-2">${post.description.slice(
      0,
      100
    )}</p>
    <div class="flex items-center gap-4 mt-4">
        <div class="w-16 h-16 flex items-center justify-center rounded-lg">
            <img class="w-full rounded-2xl" src="${post.profile_image}" alt="">
        </div>
        <div>
            <h4 class="text-base font-bold text-[#12132D]">${
              post.author.name
            }</h4>
            <span class="text-base font-normal text-[#12132D99]">${
              post.author.designation ? post.author.designation : "Unknown"
            }</span>
        </div>
    </div>
    </div>`;
    latestContainer.appendChild(div);
  });
};

getLatestPost();
window.addEventListener("load", getPost("comedy"));
