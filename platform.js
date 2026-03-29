let data = JSON.parse(localStorage.getItem("skills")) || [];

function addSkill() {
    let name = document.getElementById("name").value;
    let teach = document.getElementById("teach").value;
    let learn = document.getElementById("learn").value;

    if (!name || !teach || !learn) {
        alert("Fill all fields!");
        return;
    }

    let obj = {
        id: Date.now(),
        name,
        teach,
        learn
    };

    data.push(obj);
    saveData();
    display(data);

    document.getElementById("name").value = "";
    document.getElementById("teach").value = "";
    document.getElementById("learn").value = "";
}

function saveData() {
    localStorage.setItem("skills", JSON.stringify(data));
}

function display(arr) {
    let output = document.getElementById("output");
    output.innerHTML = "";

    arr.forEach(user => {
        output.innerHTML += `
        <div class="card">
            <h3>${user.name}</h3>
            <p><b>Teaches:</b> ${user.teach}</p>
            <p><b>Wants:</b> ${user.learn}</p>
            <button onclick="deleteUser(${user.id})">Delete</button>
            <button onclick="findMatch('${user.learn}')">Find Match</button>
        </div>
        `;
    });
}

function deleteUser(id) {
    data = data.filter(u => u.id !== id);
    saveData();
    display(data);
}

function searchSkill() {
    let search = document.getElementById("search").value.toLowerCase();

    let filtered = data.filter(u =>
        u.teach.toLowerCase().includes(search) ||
        u.learn.toLowerCase().includes(search)
    );

    display(filtered);
}

function displayAll() {
    display(data);
}

function findMatch(skill) {
    let matches = data.filter(u =>
        u.teach.toLowerCase().includes(skill.toLowerCase())
    );

    display(matches);
}

window.onload = function () {
    display(data);
};

            