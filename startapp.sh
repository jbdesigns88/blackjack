#!/bin/bash
docker build --no-cache -t blackjack .
docker run -d -p 3000:3000 --name blackjack -v ${PWD}:/usr/src/app blackjack
