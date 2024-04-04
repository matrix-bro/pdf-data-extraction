from django.urls import path
from app.pdf import pdf

urlpatterns = [
    path('extract-text/', pdf.ExtractTextView.as_view(), name="extract_text"),
]
