let passwords = [];
let passwordCount = document.getElementById("passwordCount");
let passwordList = document.getElementById("passwordList");

document.getElementById("createButton").addEventListener("click", createPassword);
document.getElementById("searchButton").addEventListener("click", searchPassword);

function createPassword() {
    let title = document.getElementById("titleInput").value.trim();
    let password = document.getElementById("passwordInput").value.trim();

    if (title === "" || password === "") {
        alert("Please enter both title and password.");
        return;
    }

    passwords.push({ title, password });
    
    document.getElementById("titleInput").value = "";
    document.getElementById("passwordInput").value = "";

    updatePasswordCount();
    displayPasswords();
}

function displayPasswords() {
    passwordList.innerHTML = "";
    
    passwords.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.title;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editPassword(index);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deletePassword(index);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        passwordList.appendChild(li);
    });
}

function editPassword(index) {
    let newTitle = prompt("Enter new title:", passwords[index].title);
    let newPassword = prompt("Enter new password:", passwords[index].password);

    if (newTitle !== null && newPassword !== null) {
        passwords[index] = { title: newTitle, password: newPassword };
        
        displayPasswords();
        updatePasswordCount();
    }
}

function deletePassword(index) {
    if (confirm(`Are you sure you want to delete "${passwords[index].title}"?`)) {
        passwords.splice(index, 1);
        
        displayPasswords();
        updatePasswordCount();
    }
}

function searchPassword() {
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();
    
    let filteredPasswords = passwords.filter(item => item.title.toLowerCase().includes(searchTerm));
    
    passwordList.innerHTML = "";
    
    filteredPasswords.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.title;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editPassword(index);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deletePassword(index);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        passwordList.appendChild(li);
    });
}

function updatePasswordCount() {
    passwordCount.textContent = passwords.length;
}
