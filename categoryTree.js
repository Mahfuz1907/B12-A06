fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => loadCategories(data.categories));

const loadCategories = (categories) => {
  let allTree = document.getElementById("trees-category-all");

  categories.forEach((category) => {
    let categoryDivForTree = document.createElement("div");
    categoryDivForTree.id = `trees-category-${category.id}`;
    categoryDivForTree.className =
      "col-span-2 sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 justify-between items-start gap-[30px] tree-cards hidden";

    allTree.after(categoryDivForTree);
  });
};

const categoriesContainer = document.getElementById("categories-list");

categoriesContainer.addEventListener("click", (event) => {
  const categoryElement = event.target.closest('[id^="category-"]');

  if (!categoryElement) return;

  const idNumber = categoryElement.id.replace("category-", "");
  const targetTree = document.getElementById(`trees-category-${idNumber}`);
  loadCategoryTrees(idNumber);

  if (targetTree) {
    const allTrees = document.querySelectorAll('[id^="trees-category-"]');
    const allCategory = document.querySelectorAll('[id^="category-"]');

    allTrees.forEach((trees) => trees.classList.add("hidden"));
    allCategory.forEach((cat) => cat.classList.remove("active-category"));

    targetTree.classList.remove("hidden");
    document
      .getElementById(`category-${idNumber}`)
      .classList.add("active-category");
  }
});

//loading trees for each categories
const loadCategoryTrees = (id) => {
  const url =
    id === "all"
      ? "https://openapi.programming-hero.com/api/plants"
      : `https://openapi.programming-hero.com/api/category/${id}`;
  toggleSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTree(data.plants, id))
    .catch((err) => console.error(err))
    .finally(() => {
      toggleSpinner(false);
    });
};

const displayTree = (data, id) => {
  let trees = document.getElementById(`trees-category-${id}`);
  data.forEach((tree) => {
    let treeCard = document.createElement("div");
    treeCard.className = "tree-card";
    treeCard.innerHTML = `
    <img class='tree-img' src=${tree.image} alt="" />
            <div class="flex flex-col justify-center items-start gap-2">
              <h3 class="text-[#1f2937] font-semibold text-sm">${tree.name}</h3>
              <p class="text-[#1f2937] font-normal text-xs">
                ${tree.description}
              </p>
              <div class="flex flex-row justify-between items-center w-full">
                <h4
                  class="px-3 py-1 bg-[#dcfce7] rounded-[400px] text-[#15803d] font-medium text-sm"
                >
                  ${tree.category}
                </h4>
                <h4 class="text-[#152937] text-sm font-semibold">&#2547;${tree.price}</h4>
              </div>
            </div>
            <button class="w-full">Add to Cart</button>`;

    trees.appendChild(treeCard);
  });
};
