#!/bin/bash
docker build --no-cache -t blackjack .
docker run -d -p 3000:3000  blackjack

