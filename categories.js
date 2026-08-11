fetch("https://openapi.programming-hero.com/api/categories")
  .then((response) => response.json())
  .then((data) => loadCategory(data.categories));

fetch("https://openapi.programming-hero.com/api/plants")
  .then((res) => res.json())
  .then((data) => loadTrees(data.plants));

const loadCategory = (data) => {
  let categoriesList = document.getElementById("categories-list");
  for (let cat of data) {
    let categoryList = document.createElement("li");
    categoryList.innerText = cat.category_name;
    categoriesList.appendChild(categoryList);
  }
};

const loadTrees = (data) => {
  let trees = document.getElementById("tree-cards");
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
