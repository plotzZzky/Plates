from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
import json

from .models import Plate
from .formValid import validate


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def show_all_plates(request):
    models = Plate.objects.all()  # type:ignore
    data = [serialize_plate(item) for item in models]
    return JsonResponse({'cars': data}, safe=False)


def serialize_plate(item):
    id = item.id
    number = item.number
    city = item.city
    model = item.model
    manufacturer = item.manufacturer
    color = item.color
    year = item.year
    item_dict = {'id': id, 'number': number, 'city': city, 'model': model, 'manufacturer': manufacturer, 'color': color,
                 'year': year}
    return item_dict


@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def create_plate(request):
    file = json.loads(request.body)
    v = validate(file)
    if v:
        plate = Plate(
            number=file['number'].upper(),
            city=file['city'].title(),
            manufacturer=file['manufacturer'].capitalize(),
            model=file['model'].capitalize(),
            color=file['color'].capitalize(),
            year=file['year'].capitalize()
        )
        plate.save()
        return HttpResponse('Placa criada', status=200)
    return HttpResponse('Formulario invalido', status=500)


@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def edit_plate(request, plate_id):
    file = json.loads(request.body)
    v = validate(file)
    if v:
        model = Plate.objects.get(pk=plate_id)  # type:ignore
        model.number = file['number'].upper()
        model.city = file['city'].title()
        model.manufacturer = file['manufacturer'].capitalize()
        model.model = file['model'].capitalize()
        model.color = file['color'].capitalize()
        model.year = file['year']
        model.save()
        return HttpResponse('Placa criada', status=200)
    return HttpResponse("Formulario incorreto", status=500)


@api_view(['GET'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_plate(request, plate_id):
    try:
        plate = Plate.objects.get(pk=plate_id)  # type:ignore
        plate.delete()
        return HttpResponse('Placa deletada', status=200)
    except Plate.DoesNotExist:  # type:ignore
        return HttpResponse('Placa não encontrada', status=404)
