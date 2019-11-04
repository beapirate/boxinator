#!/bin/bash
if [ -n < "$(which winpty)" ]; then
    winpty docker run -it -v /"$PWD":/src boxinator-devenv
else 
    docker run -it -v "$PWD":/src boxinator-devenv
fi
