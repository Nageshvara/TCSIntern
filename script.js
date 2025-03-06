import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDeyw51J6y9IPTNntl-QY9T-lp3fXGr1eQ",
    authDomain: "formval-59706.firebaseapp.com",
    databaseURL: "https://formval-59706-default-rtdb.firebaseio.com",
    projectId: "formval-59706",
    storageBucket: "formval-59706.appspot.com",
    messagingSenderId: "750673335452",
    appId: "1:750673335452:web:64a14da9e1afa5c5514959"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function insertData() {
    const authorRef = ref(db, "Authors/" + Author.value + "/Books");
    get(authorRef).then((snapshot) => {
        if (snapshot.exists()) {
            let bookExists = false;
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().BookName === BookName.value) {
                    bookExists = true;
                }
            });

            if (bookExists) {
                alert("This book name already exists under this author.");
                return;
            }
        }
        set(ref(db, "Authors/" + Author.value + "/AuthorDetails"), {
            Author: Author.value,
            AuthorEmail: AuthorEmail.value
        });

        const newBookRef = push(authorRef);
        set(newBookRef, {
            BookName: BookName.value,
            Publisher: Publisher.value,
            Description: Description.value,
            Price: Price.value
        }).then(() => {
            alert("Data is Entered");
        }).catch((error) => {
            alert("Unsuccessful: " + error);
        });
    }).catch((error) => {
        alert("Error checking book existence: " + error);
    });
}

document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (this.checkValidity()) {
        insertData();
    } else {
        this.classList.add("was-validated");
    }
});
