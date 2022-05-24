import time
import os

def hello(event, context):
    print('Hello world', os.environ['FIRST_NAME'])
    time.sleep(4)

    return 'another hello world'
