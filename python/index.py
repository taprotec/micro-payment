from base64 import b64encode, b64decode
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as PKCS1
import sys

api_key = sys.argv[1]
public_key = sys.argv[2]

# decode public key
decoded_public_key = b64decode(public_key)

# import public key on RSA
public_key_import = RSA.importKey(decoded_public_key)

# digest the public key
digested_public_key = PKCS1.new(public_key_import)

# encrypt api key
encrypted_api_key = digested_public_key.encrypt(api_key.encode('ascii'))

# encode encrypted api key 
encoded_api_key = b64encode(encrypted_api_key)
print(encoded_api_key)