const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  const treeSection = document.getElementById("tree-section");

  if (isLoading) {
    spinner.classList.remove("hidden");
    treeSection.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    treeSection.classList.remove("hidden");
  }
};
