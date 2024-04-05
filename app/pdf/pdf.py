from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
import pdfplumber

class ExtractTextView(APIView):
    class InputSerializer(serializers.Serializer):
        page = serializers.IntegerField()
        file = serializers.FileField()
    
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pdf_file = serializer.validated_data['file']
        pg_no = serializer.validated_data['page']

        with pdfplumber.open(pdf_file) as pdf:
            try:
                page = pdf.pages[pg_no - 1]
            except:
                return Response(
                    data={
                        "message": "Page not found.",
                        "status": status.HTTP_404_NOT_FOUND,

                }, status=status.HTTP_404_NOT_FOUND)
            # print(page)
            text = page.extract_text()

        return Response(
            data={
                "message": "Success",
                "result": text,
                "status": status.HTTP_200_OK,

        }, status=status.HTTP_200_OK)