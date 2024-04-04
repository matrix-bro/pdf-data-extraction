from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

class ExtractTextView(APIView):
    class InputSerializer(serializers.Serializer):
        file = serializers.FileField()
    
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            data={
                "message": "Test",
                "status": status.HTTP_200_OK,

        }, status=status.HTTP_200_OK)