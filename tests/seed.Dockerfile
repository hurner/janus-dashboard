FROM mongo

COPY seed.json /seed.json
CMD mongoimport --host janus-database --db janus --collection api_specs --file /seed.json --jsonArray
