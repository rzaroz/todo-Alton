from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class form_register(forms.Form):

    def __init__(self, *args, **kwargs):
        super(form_register, self).__init__(*args, **kwargs)
        self.fields["email"].error_messages["required"] = "ایمیل نباید خالی باشد!"
        self.fields["password1"].error_messages["required"] = "رمز عبور نباید خالی باشد!"

    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": "لطفا نام کاربری خود را وارد کنید ..."
            }
        ),
        label_suffix="",
        label="نام کاربری"
    )

    email = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": "لطفا ایمیل خود را وارد کنید ...",
                "required": True,
                "type": "email"
            }
        ),
        label_suffix="",
        label="ایمیل"
    )

    password1 = forms.CharField(
        widget=forms.PasswordInput(),
        label_suffix="",
        label="رمز عبور"
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(),
        label_suffix="",
        label="تکرار رمز عبور"
    )

    def clean(self):
        cd = super().clean()
        email = cd.get("email")
        p1 = cd.get("password1")
        p2 = cd.get("password2")
        username = cd.get("name")

        auth_username = User.objects.filter(username=username).first()
        auth_email = User.objects.filter(email=email).first()

        if auth_email:
            raise ValidationError("ایمیل قبلا ثبت شده است!")

        if auth_username:
            raise ValidationError("ناکاربری قبلا ثبت شده است!")

        if username == "":
            raise ValidationError("نام کاربری خالی است!")

        if email:
            if "@" not in email or "." not in email:
                raise ValidationError("ایمیل نامعتبر است!")

        if p1:
            if p1 != p2:
                raise ValidationError("boro madar khoobe!!")



        return cd