from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.views import View
from todo.models import Todo
from .forms import form_register
from django.contrib import messages

class register(View):

    def get(self,request):
        if request.user.is_anonymous:
            form = form_register()
            return render(request, "register.html", {"form": form})
        else:
            return redirect("/")


    def post(self, request):
        if request.user.is_anonymous:
            form = form_register(request.POST)
            if form.is_valid():
                cd = form.cleaned_data
                new_user = User.objects.create_user(username=cd.get("name"), email=cd.get("email"),
                                                    password=cd.get("password1"))
                new_user.save()
                return redirect("/login/")
            return render(request, "register.html", {"form": form})
        else:
            return redirect("/")


def login_view(request):
    if request.user.is_anonymous:
        if request.POST:
            username = request.POST.get("username")
            password = request.POST.get("password")

            auth = authenticate(request, username=username, password=password)
            if auth:
                login(request=request, user=auth)
                return redirect("/")
            else:
                messages.error(request, "نام کاربری یا رمز عبور اشتباه است")

        context = {}
        return render(request, "login.html", context)
    else:
        return redirect("/")


def homepage(request):
    context = {}

    if request.user.is_anonymous:
        return redirect("login/")

    context["user"] = request.user
    user_todos = Todo.objects.filter(user_id=request.user.id).all()
    context["todos"] = user_todos

    return render(request, "home.html", context)


def delete_todo(request):
    if request.POST:
        todo_id = request.POST.get("todoId")
        todo = Todo.objects.filter(id=todo_id).first()

        if todo:
            todo.delete()
            return JsonResponse({"status": "ok"})
        else:
            return JsonResponse({"status": "no"})

    return redirect("/")

def update_todo(request):
    if request.POST:
        text = request.POST.get("update_input_in")
        todo_id = request.POST.get("todo_id")
        todo = Todo.objects.filter(id=todo_id).first()
        if todo:
            if len(text) > 0 and len(text) < 60:
                todo.text = text
                todo.save()
                return JsonResponse({"status": "ok"})
            else:
                return JsonResponse({"status": "no"})

    return redirect("/")

def new_todo(request):
    if request.POST:
        text = request.POST.get("text")

        if len(text) > 0 and len(text) < 60:
            todo = Todo.objects.create(user_id=request.user.id, text=text)
            todo.save()
            return JsonResponse({"status": "ok", "id": todo.id})
        else:
            return JsonResponse({"status": "no"})

    return redirect("/")

def log_out(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("/")
    else:
        return redirect("/")