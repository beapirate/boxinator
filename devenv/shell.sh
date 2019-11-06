#!/bin/bash
if [ -n < "$(which winpty)" ]; then
    winpty docker run -it -v /"$PWD":/src -p "8080:8080" boxinator-devenv
else 
    docker run -it -v "$PWD":/src -p "8080:8080" boxinator-devenv
fi
