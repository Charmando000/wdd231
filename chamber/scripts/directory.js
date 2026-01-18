const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  members.forEach(member => {
    const card = document.createElement("section");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const img = document.createElement("img");
    img.src = `images/${member.image}`;
    img.alt = `Logo of ${member.name}`;
    img.loading = "lazy";

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";

    card.append(img, name, address, phone, website);
    directory.appendChild(card);
  });
}

// Grid / List toggle
gridButton.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listButton.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// 🚀 IMPORTANT
getMembers();

