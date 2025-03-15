const form = document.getElementById("userForm");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const message = document.getElementById("message");
        const restoreBut = document.getElementById("restore");

        restoreBut.onclick = () => {
            nameInput.value = localStorage.getItem("name") || "";
            emailInput.value = localStorage.getItem("email") || "";
        };

        form.onsubmit = async (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (!name) {
                message.textContent = "Поле ім'я не може бути порожнім";
                message.className = "error";
                return;
            }

            if (!email.includes("@")) {
                message.textContent = "Введіть коректний email";
                message.className = "error";
                return;
            }

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);

            try {
                const frr = await fetch("https://reqres.in/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email })
                });

                if (!frr.ok) throw new Error("Помилка сервера. Спробуйте пізніше.");

                const data = await frr.json();
                message.textContent = `Користувач ${data.name} створений`;
                message.className = "success";
            } catch (error) {
                message.textContent = error.message;
                message.className = "error";
            }
        };



