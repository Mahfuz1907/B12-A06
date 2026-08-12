const treeSection = document.getElementById("tree-section");

treeSection.addEventListener("click", (event) => {
  const treeButton = event.target.closest('[id^="tree-name-"]');
  if (!treeButton) return;
  const treeID = treeButton.id.replace("tree-name-", "");

  loadTreeDetails(treeID);
});

const loadTreeDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((plant) => showModal(plant.plants));
};

const showModal = (plant) => {
  if (!plant) return;

  document.getElementById("modal-img").src = plant.image;
  document.getElementById("modal-title").innerText = plant.name;
  document.getElementById("modal-description").innerText = plant.description;
  document.getElementById("modal-category").innerText = plant.category;
  document.getElementById("modal-price").innerText = `৳${plant.price}`;

  const modal = document.getElementById("my-modal-2");
  modal.showPopover();
};
