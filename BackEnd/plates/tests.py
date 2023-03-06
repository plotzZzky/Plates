from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import Plate
from .formValid import validate


class PlatesTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.data = {
            'number': 'ccc3c33',
            'city': 'Canoas-Rs',
            'model': 'Argo',
            'manufacturer': 'Fiat',
            'color': 'Vermelho',
            'year': '2020'
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_plates_status(self):
        response = self.client.get("")
        self.assertEqual(response.status_code, 200)

    def test_get_plates(self):
        response = self.client.get("")
        self.assertEqual(response.json(), {'cars': []})

    def test_create_plate_status(self):
        response = self.client.post("/add/", self.data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_plate(self):
        self.client.post("/add/", self.data, format='json')
        plate = Plate.objects.get(model="Argo")  # type:ignore
        self.assertEqual(plate.number, "CCC3C33")

    def test_delete_plate_status(self):
        plate = Plate(
            number=self.data['number'],
            city=self.data['city'],
            model=self.data['model'],
            manufacturer=self.data['manufacturer'],
            color=self.data['color'],
            year=self.data['year']
        )
        plate.save()
        response = self.client.get(f"/del={plate.id}/")  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_delete_plate(self):
        plate = Plate(
            number=self.data['number'],
            city=self.data['city'],
            model=self.data['model'],
            manufacturer=self.data['manufacturer'],
            color=self.data['color'],
            year=self.data['year']
        )
        plate.save()
        self.client.get(f"/del={plate.id}/")  # type:ignore
        try:
            response = Plate.objects.get(pk=plate.id)  # type:ignore
        except Plate.DoesNotExist:  # type:ignore
            response = False
        self.assertEqual(response, False)

    def test_edit_plate_status(self):
        data = {
            'number': 'number',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        plate = Plate(
            number=self.data['number'],
            city=self.data['city'],
            model=self.data['model'],
            manufacturer=self.data['manufacturer'],
            color=self.data['color'],
            year=self.data['year']
        )
        plate.save()
        response = self.client.post(f"/edit={plate.id}/", data, format='json')  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_edit_plate(self):
        data = {
            'number': 'number',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        plate = Plate(
            number=self.data['number'],
            city=self.data['city'],
            model=self.data['model'],
            manufacturer=self.data['manufacturer'],
            color=self.data['color'],
            year=self.data['year']
        )
        plate.save()
        self.client.post(f"/edit={plate.id}/", data, format='json')  # type:ignore
        response = Plate.objects.get(pk=plate.id)  # type:ignore
        self.assertEqual(response.model, "Model")


class FormValidTest(TestCase):
    def setUp(self):
        pass

    def test_number(self):
        data = {
            'number': 'number',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        result = validate(data)
        self.assertTrue(result)

    def test_number_error_5(self):
        data = {
            'number': '12345',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        result = validate(data)
        self.assertFalse(result)

    def test_number_error_9(self):
        data = {
            'number': '0123456789',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        result = validate(data)
        self.assertFalse(result)

    def test_year(self):
        data = {
            'number': '01234567',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2020
        }
        result = validate(data)
        self.assertTrue(result)

    def test_year_error_1989(self):
        data = {
            'number': '01234567',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 1989
        }
        result = validate(data)
        self.assertFalse(result)

    def test_year_error_2024(self):
        data = {
            'number': '01234567',
            'city': 'city',
            'model': 'model',
            'manufacturer': 'manufacturer',
            'color': 'color',
            'year': 2024
        }
        result = validate(data)
        self.assertFalse(result)


