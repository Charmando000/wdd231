const params = new URLSearchParams(window.location.search);

document.getElementById("fname").textContent = params.get("fname");
document.getElementById("lname").textContent = params.get("lname");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("organization").textContent = params.get("organization");

const rawTimestamp = params.get("timestamp");
if (rawTimestamp) {
    const date = new Date(rawTimestamp);
    document.getElementById("timestamp").textContent = date.toLocaleString();
}