for filename in ~/database-scripts/*.sql; do
    ./sqlplus "ADMIN"/"MySecurePassword123"@"$ORACLEDB_CONNECTION_STRING" @ "$filename"
done