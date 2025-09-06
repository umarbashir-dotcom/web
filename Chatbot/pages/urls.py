from django.urls import path
from pages import views

# Create paths here (url dispatcher)
urlpatterns = [
    path("",views.index,name='index'),
    path("myapi/chat/",views.chat,name="chat")
]

