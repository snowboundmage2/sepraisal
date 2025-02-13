#!/bin/bash

set -x

toUnicode() {
    FILENAME=$1
    temp_file=$(mktemp)
    cp $FILENAME $temp_file
    uconv -f utf8 -t utf8 --remove-signature $temp_file -o $FILENAME
}

# Linux only (because paths, feel free to improve).
# first cd to sepraisal/workspaces/praisal/vendor.

STEAM_DIR=$1
SE_DIR="$STEAM_DIR/steamapps/common/SpaceEngineers"
DATA_DIR="$SE_DIR/Content/Data"

# Vanilla
FOLDER=Vanilla
mkdir -p "$FOLDER"  # Ensure directory exists
cp "$DATA_DIR/Blueprints.sbc" "$FOLDER"
cp "$DATA_DIR/Components.sbc" "$FOLDER"
cp "$DATA_DIR/PhysicalItems.sbc" "$FOLDER"
find "$DATA_DIR/CubeBlocks" -name *.sbc\
    | grep -v 'Frostbite'\
    | grep -v 'Economy'\
    | grep -v 'DecorativePack'\
    | grep -v 'SparksOfTheFuturePack'\
    | grep -v 'ScrapRacePack'\
    | grep -v 'Warfare1'\
    | grep -v 'IndustrialPack'\
    | grep -v 'Warfare2'\
    | grep -v 'Automation'\
    | grep -v 'DecorativePack3'\
    | grep -v 'SignalsPack'\
    | grep -v 'ContactPack'\
    | xargs cp -t "$FOLDER/CubeBlocks"

# Decorative Pack 1
FOLDER=DecorativePack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Decorative Pack 2
FOLDER=DecorativePack2
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Economy
FOLDER=Economy
mkdir -p "$FOLDER"
cp "$DATA_DIR/Blueprints_$FOLDER.sbc" "$FOLDER/Blueprints.sbc"
cp "$DATA_DIR/Components_$FOLDER.sbc" "$FOLDER/Components.sbc"
cp "$DATA_DIR/PhysicalItems_$FOLDER.sbc" "$FOLDER/PhysicalItems.sbc"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Frostbite
FOLDER=Frostbite
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# SparksOfTheFuturePack
FOLDER=SparksOfTheFuturePack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# ScrapRacePack
FOLDER=ScrapRacePack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Warfare 1
FOLDER=Warfare1
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Industrial Pack
FOLDER=IndustrialPack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Warfare 2
FOLDER=Warfare2
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Automatons
FOLDER=Automation
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Decorative Pack 3
FOLDER=DecorativePack3
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Signal Pack
FOLDER=SignalsPack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

# Contact Pack
FOLDER=ContactPack
mkdir -p "$FOLDER"
cp "$DATA_DIR/CubeBlocks/CubeBlocks_$FOLDER.sbc" "$FOLDER/CubeBlocks.sbc"

for f in $(find . -name *.sbc)
do
    sed -i 's/\r$//' $f  # Change CRLF to LF.
    toUnicode $f  # Change encoding to UTF-8 without BOM.
done
