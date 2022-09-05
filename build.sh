#!/bin/bash
set -e pipefail
npm ci &
cd client && npm i && npm run build
rm -rf public
rm -rf src
rm -rf node_modules