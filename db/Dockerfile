FROM mysql:8.0

COPY DB_DUMP.sql /docker-entrypoint-initdb.d/db.sql
# COPY my.cnf /etc/mysql/my.cnf

# RUN /entrypoint.sh mysqld & sleep 30 && killall mysqld
# RUN rm /docker-entrypoint-initdb.d/db.sql