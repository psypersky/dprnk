__Call render server with empty state__
curl -d '{"state":{}}' -H "Content-Type: application/json" -X POST http://localhost:4000/render

npm install adddep -g

#### Setup Development environment

Clone the repo

Create env file
`cp env/.env.default env/.env.dev`

Add permissions to sh file
`chmod +x docker-entrypoint-dev.sh`



Error levels of winstons
error, warn, info, verbose, debug, silly