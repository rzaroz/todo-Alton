$(document).ready(function () {
    let todoCards = document.querySelectorAll('.todo-card');
    let csrf = document.querySelector(".csrf > input")
    let submit = document.querySelector(".submit")

    submit.addEventListener("click", function (e) {
        let text = document.getElementById("new_todo_text")
        let fd = new FormData();
        fd.append("text", text.value)
        fd.append("csrfmiddlewaretoken", csrf.value)
        if(text.value == "") {
            alert("خالی است!")
        }else {
            axios.post("http://127.0.0.1:8000/new_todo/", fd)
                .then(
                    (res) => {
                        let noTodo = document.querySelector(".no-todo")

                        if (noTodo != null) {
                            noTodo.remove()
                        }

                        let id = res.data.id
                        let todoContainer = document.querySelector(".todo")
                        let newTodo = document.createElement("div")
                        let updateContainer = document.createElement("div")
                        let inputId = document.createElement("input")
                        let Btns = document.createElement("div")

                        let delBtn = document.createElement("button")
                        let upBtn = document.createElement("button")

                        let texttodo = document.createElement("p")
                        let numberTodo = document.createElement("h3")

                        delBtn.className = "delete"
                        upBtn.className = "update"

                        Btns.className = "btns"

                        inputId.type = "hidden"
                        inputId.id = "todo_id"
                        inputId.value = id

                        updateContainer.className = "update_containe"

                        newTodo.className = "todo-card"

                        delBtn.innerHTML += `<h4>حذف</h4>`
                        upBtn.innerHTML += `<h4>آپدیت</h4>`

                        texttodo.innerText = text.value
                        numberTodo.innerText = id

                        Btns.appendChild(delBtn)
                        Btns.appendChild(upBtn)

                        newTodo.appendChild(updateContainer)
                        newTodo.appendChild(inputId)
                        newTodo.appendChild(Btns)
                        newTodo.appendChild(texttodo)
                        newTodo.appendChild(numberTodo)

                        todoContainer.appendChild(newTodo)
                        todoCards = document.querySelectorAll(".todo-card")
                        for (let i = 0; i < todoCards.length; i++) {
                            let todo = todoCards[i];
                            let delElemet = todo.querySelector(".delete")
                            let update = todo.querySelector(".update")
                            delElemet.addEventListener("click", function (e) {
                                let todoId = todo.querySelector("#todo_id")
                                let fd = new FormData();
                                fd.append("todoId", todoId.value)
                                fd.append("csrfmiddlewaretoken", csrf.value)

                                axios.post("http://127.0.0.1:8000/delete_todo/", fd)
                                    .then(
                                        (res) => {
                                            todo.remove()
                                        }
                                    )
                                    .catch(
                                        (err) => {
                                            alert("مشکلی در حذف وجود دارد مجددا تلاش فرمایید‌!")
                                        }
                                    )
                            })

                            update.addEventListener("click", function (e) {
                                let upInput = document.createElement("input")
                                let upSubmit = document.createElement("button")
                                let updateContainer = todo.querySelector(".update_containe")
                                let todoId = todo.querySelector("#todo_id")
                                let btns = todo.querySelector(".btns")

                                upSubmit.innerText = "ثبت"
                                upSubmit.style.background = "Blue"

                                upInput.type = "text"
                                upInput.placeholder = "لطفا متن آپدیت خود را وارد کنید ."
                                upInput.name = "update_input_in"
                                updateContainer.appendChild(upSubmit)
                                updateContainer.appendChild(upInput)

                                update.remove()
                                delElemet.remove()

                                let fd = new FormData();
                                upSubmit.addEventListener("click", function (e) {
                                    if (upInput.value == "") {
                                        alert("خالی است!")
                                        btns.appendChild(delElemet)
                                        btns.appendChild(update)
                                        updateContainer.innerHTML = ""
                                    } else {
                                        fd.append("update_input_in", upInput.value)
                                        fd.append("todo_id", todoId.value)
                                        fd.append("csrfmiddlewaretoken", csrf.value)
                                        axios.post("http://127.0.0.1:8000/update_todo/", fd)
                                            .then(
                                                (res) => {
                                                    btns.appendChild(delElemet)
                                                    btns.appendChild(update)
                                                    todo.querySelector("p").innerHTML = upInput.value
                                                    updateContainer.innerHTML = ""
                                                }
                                            )
                                            .catch(
                                                (err) => {
                                                    alert("مشکلی در بروزرسانی وجود دارد مجددا تلاش فرمایید‌!")
                                                }
                                            )
                                    }
                                })
                            })
                        }
                        text.value = ""
                    }
                )
                .catch(
                    (err) => {
                        console.log(err)
                    }
                )
        }
    })

    if (todoCards.length > 0) {
        for (let i = 0; i < todoCards.length; i++) {
            let todo = todoCards[i];
            let delElemet = todo.querySelector(".delete")
            let update = todo.querySelector(".update")

            delElemet.addEventListener("click", function (e) {
                let todoId = todo.querySelector("#todo_id")
                let fd = new FormData();
                fd.append("todoId", todoId.value)
                fd.append("csrfmiddlewaretoken", csrf.value)

                axios.post("http://127.0.0.1:8000/delete_todo/", fd)
                        .then(
                            (res)=>{
                                todo.remove()
                            }
                        )
                        .catch(
                            (err)=>{
                                alert("مشکلی در حذف وجود دارد مجددا تلاش فرمایید‌!")
                            }
                        )
            })

            update.addEventListener("click", function (e) {
                let upInput = document.createElement("input")
                let upSubmit = document.createElement("button")
                let updateContainer = todo.querySelector(".update_containe")
                let todoId = todo.querySelector("#todo_id")
                let btns = todo.querySelector(".btns")

                upSubmit.innerText = "ثبت"
                upSubmit.style.background = "Blue"

                upInput.type = "text"
                upInput.placeholder = "لطفا متن آپدیت خود را وارد کنید ."
                upInput.name = "update_input_in"
                updateContainer.appendChild(upSubmit)
                updateContainer.appendChild(upInput)

                update.remove()
                delElemet.remove()

                let fd = new FormData();
                upSubmit.addEventListener("click", function (e) {
                    if (upInput.value == "") {
                        alert("خالی است!")
                        btns.appendChild(delElemet)
                        btns.appendChild(update)
                        updateContainer.innerHTML = ""
                    }else {
                        fd.append("update_input_in", upInput.value)
                        fd.append("todo_id", todoId.value)
                        fd.append("csrfmiddlewaretoken", csrf.value)
                        axios.post("http://127.0.0.1:8000/update_todo/", fd)
                            .then(
                                (res)=>{
                                    btns.appendChild(delElemet)
                                    btns.appendChild(update)
                                    todo.querySelector("p").innerHTML = upInput.value
                                    updateContainer.innerHTML = ""
                                }
                            )
                            .catch(
                                (err)=>{
                                    alert("مشکلی در بروزرسانی وجود دارد مجددا تلاش فرمایید‌!")
                                }
                            )
                    }
                })
            })
        }
    }

})