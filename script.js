const form = document.getElementById("itemForm");
const collectionList = document.getElementById("collectionList");

let items = JSON.parse(localStorage.getItem("kolexItems")) || [];

function saveItems() {
  localStorage.setItem("kolexItems", JSON.stringify(items));
}

function renderItems() {
  collectionList.innerHTML = "";

  if (items.length === 0) {
    collectionList.innerHTML = "<p>No items yet.</p>";
    return;
  }

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Model:</strong> ${item.model || "-"}</p>
      <p><strong>Year:</strong> ${item.year || "-"}</p>
      <p><strong>Condition:</strong> ${item.condition || "-"}</p>
      <p><strong>Purchase Price:</strong> $${item.price || 0}</p>
      <p><strong>Current Value:</strong> $${item.value || 0}</p>
      <p><strong>Notes:</strong> ${item.notes || "-"}</p>
      <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
    `;

    collectionList.appendChild(div);
  });
}

function deleteItem(index) {
  items.splice(index, 1);
  saveItems();
  renderItems();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newItem = {
    name: document.getElementById("name").value,
    model: document.getElementById("model").value,
    year: document.getElementById("year").value,
    condition: document.getElementById("condition").value,
    price: document.getElementById("price").value,
    value: document.getElementById("value").value,
    notes: document.getElementById("notes").value
  };

  items.push(newItem);
  saveItems();
  renderItems();
  form.reset();
});

renderItems();
