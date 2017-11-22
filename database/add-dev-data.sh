#!/bin/bash

echo "****** Adding development data ******"

psql -U "$DB_USER" "$DB_NAME" -f /usr/development-data.sql

echo ""
echo "****** Development data added! ******"
