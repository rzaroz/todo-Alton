from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from backend.views import homepage, login_view, delete_todo, update_todo, new_todo, register, log_out

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homepage),
    path('login/', login_view, name="login"),
    path('delete_todo/', delete_todo),
    path('update_todo/', update_todo),
    path('new_todo/', new_todo),
    path('signin/', register.as_view(), name="sign"),
    path('logout/', log_out, name="out"),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)