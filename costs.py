import boto3
from datetime import date, timedelta
import pymongo

_uri = ""
_conn = pymongo.MongoClient(_uri)

today = date.today()
yesterday = today - timedelta(days=1)

client = boto3.client('ce')

response = client.get_cost_and_usage(
    TimePeriod={
        'Start': yesterday.strftime("%Y-%m-%d"),
        'End': today.strftime("%Y-%m-%d")
    },
    Granularity='DAILY',
    Metrics=[
        'AmortizedCost',
    ]
)

_conn["aws"]["dailyce"].insert_one(response)