//"dbbd02dc5e65426da090e6d89f5588e8"

let currentQuery = "sports";
let currentPage = 1;
const fetchNews = async (page, q) => {
  console.log(`Fetching news for${q}, Page number ${page}... `);

  var url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    q +
    "&from=2024-08-10&" +
    "pageSize=20&" +
    "language=en&" +
    "page=" +
    page +
    "&sortBy=popularity&" +
    "apiKey=dbbd02dc5e65426da090e6d89f5588e8";

  var req = new Request(url);

  let a = await fetch(req);
  let response = await a.json();

  let str = "";
  resultCount.innerHTML = response.totalResults;
  for (let item of response.articles) {
    str =
      str +
      ` <div class="card my-4 mx-2" style="width: 18rem">
          <img src="${item.urlToImage}" class="card-img-top" alt="..." height="184" />
          <div class="card-body">
            <h5 class="card-title">${item.title.slice(0,30)}...</h5>
            <p class="card-text">${item.description.slice(0,123)}...
            </p>
            <a href="${item.url}" target="_blank"  class="btn btn-primary">Read article</a>
          </div>
        </div>`;
  }
  document.querySelector(".content").innerHTML = str;
};
fetchNews(1, currentQuery);
search.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchInput.value;
  currentQuery = query;
  fetchNews(1, query);
});
prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    // currentQuery = query;
    fetchNews(currentPage, currentQuery);
  }
});
next.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage = currentPage + 1;
  // currentQuery = query;
  fetchNews(currentPage, currentQuery);
});
