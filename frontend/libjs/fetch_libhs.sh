#!/usr/bin/env bash
# fetch_libjs.sh

cd $(dirname $0)
pwd

# clean up
echo "delete old js and css files"
ls -la
rm *.js *.css
echo "clean directory"
ls -la



# stimulus
wget https://unpkg.com/stimulus/dist/stimulus.umd.js



# list all files
echo "new library files:"
ls -l



