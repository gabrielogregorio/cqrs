FROM postgres:12-alpine

RUN apk add --update --no-cache tzdata && rm -fr /var/cache/apk/*

COPY /sql/*.sql /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/*.sql

EXPOSE 5420

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "postgres" ]
