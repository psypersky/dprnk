#!/bin/bash

echo "****** SETING UP DATABASE ******"

psql -U "$DB_USER" "$DB_NAME" -f /usr/schema.sql

echo ""
echo "****** DATABASE SCHEMA AND FIXED DATA CREATED! ******"
