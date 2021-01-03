import requests, uuid, json, sys

# Add your subscription key and endpoint
subscription_key = "ca97f37ac2074ab58adaae42438a1bda"
endpoint = "https://api.cognitive.microsofttranslator.com"

# Add your location, also known as region. The default is global.
# This is required if using a Cognitive Services resource.
location = "westus2"

path = '/translate'
constructed_url = endpoint + path

params = {
    'api-version': '3.0',
    'to': 'es'
}
constructed_url = endpoint + path

headers = {
    'Ocp-Apim-Subscription-Key': subscription_key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-type': 'application/json',
    'X-ClientTraceId': str(uuid.uuid4())
}

# You can pass more than one object in body.
body = [{
    'text': sys.argv[1] 
}]

request = requests.post(constructed_url, params=params, headers=headers, json=body)
response = request.json()
translatedString = response[0]['translations'][0]['text']

myJson = json.dumps(response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': '))
print(myJson)
with open("../../../../../../../../jsonfile.txt", 'w') as target:  # specify path or else it will be created where you run your java code
    target.write(translatedString)



