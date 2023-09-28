import unittest
from ..custom_json_encoder import CustomJSONEncoder
from bson import ObjectId

class TestCustomJSONEncoder(unittest.TestCase):
    def test_object_id_encoding(self):
        encoder = CustomJSONEncoder()
        object_id = ObjectId()

        # Encode the ObjectId using the custom encoder
        encoded = encoder.encode({"_id": object_id})

        # Verify that the encoded output contains the string representation of ObjectId
        self.assertIn(str(object_id), encoded)