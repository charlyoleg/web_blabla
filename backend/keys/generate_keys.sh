#!/bin/bash
# generate_keys.sh

## key basename
BASENAME='web_blabla_server'
KEY_FILENAME="${BASENAME}.key"
CERT_FILENAME="${BASENAME}.crt"

## go to the script directory
cd $(dirname $0)

## create the key and certificate for ssl
openssl genrsa -out ${KEY_FILENAME} 2018
chmod a-w ${KEY_FILENAME}
chmod go-r ${KEY_FILENAME}
openssl req -new -x509 -nodes -sha256 -days 365 -key ${KEY_FILENAME} -out ${CERT_FILENAME}
