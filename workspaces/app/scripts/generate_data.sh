#!/bin/bash

TYPE=$1  # should be 'authors' or 'collections'
MY_DIR=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )  # https://stackoverflow.com/questions/24112727/relative-paths-based-on-file-location-instead-of-current-working-directory
OUT="$MY_DIR/../static/$TYPE.data"
PORT=27017  # Default MongoDB port

## Check if TYPE is provided
if [ -z "$TYPE" ]; then
  echo "Error: TYPE argument is required (e.g., 'authors' or 'collections')."
  exit 1
fi

## Run the MongoDB query and generate the output file
mongo --port $PORT --quiet "$MY_DIR/generate-$TYPE.js" > $OUT

if [ $? -ne 0 ]; then
  echo "Error: Failed to execute MongoDB query."
  exit 1
fi

## Formatting the output file
sed -ri ':a;N;$!ba;s/\n\t\t/ /g' $OUT  # collapse row values..
sed -ri ':a;N;$!ba;s/\n\t}/}/g' $OUT   # .. collapse closing } too.
sed -ri 's/"\ :/":/g' $OUT  # remove space between " and :

echo "Output written to $OUT"
