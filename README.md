# ChmuryLab5

Treść pliku Dockerfile:

    FROM node:alpine AS builder

    ARG VERSION

    WORKDIR /app

    COPY app.js .

    ENV APP_VERSION=$VERSION

    FROM nginx:stable-alpine3.17-slim

    RUN apk add --no-cache npm curl

    WORKDIR /app

    COPY --from=builder /app .

    COPY ./nginx.conf /etc/nginx/conf.d/default.conf

    EXPOSE 8080

    HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/8080 || exit 1

    CMD ["node", "app.js"]

Polecenie użytke do budowy obrazu:

    docker build --build-arg VERSION=1.0 -t lab5 .

Wynik działania polcenia build powinien być następujący:

    [+] Building 1.1s (16/16) FINISHED                                                                                                           docker:default
    => [internal] load build definition from Dockerfile                                                                                                   0.0s
    => => transferring dockerfile: 476B                                                                                                                   0.0s
    => [internal] load metadata for docker.io/library/nginx:stable-alpine3.17-slim                                                                        1.1s
    => [internal] load metadata for docker.io/library/node:alpine                                                                                         1.1s
    => [auth] library/nginx:pull token for registry-1.docker.io                                                                                           0.0s
    => [auth] library/node:pull token for registry-1.docker.io                                                                                            0.0s
    => [internal] load .dockerignore                                                                                                                      0.0s
    => => transferring context: 2B                                                                                                                        0.0s
    => [builder 1/3] FROM docker.io/library/node:alpine@sha256:916b42f9e83466eb17d60a441a96f5cd57033bbfee6a80eae8e3249f34cf8dbe                           0.0s
    => [internal] load build context                                                                                                                      0.0s
    => => transferring context: 57B                                                                                                                       0.0s
    => [stage-1 1/5] FROM docker.io/library/nginx:stable-alpine3.17-slim@sha256:5893dc08a2cb01e21592ff469346ebaacf49167fbc949f45e1c29111981b0427          0.0s
    => CACHED [stage-1 2/5] RUN apk add --no-cache npm curl                                                                                               0.0s
    => CACHED [stage-1 3/5] WORKDIR /app                                                                                                                  0.0s
    => CACHED [builder 2/3] WORKDIR /app                                                                                                                  0.0s
    => CACHED [builder 3/3] COPY app.js .                                                                                                                 0.0s
    => CACHED [stage-1 4/5] COPY --from=builder /app .                                                                                                    0.0s
    => CACHED [stage-1 5/5] COPY ./nginx.conf /etc/nginx/conf.d/default.conf                                                                              0.0s
    => exporting to image                                                                                                                                 0.0s
    => => exporting layers                                                                                                                                0.0s
    => => writing image sha256:76a4c2f3718fc0e0b808d43d02cdfd0426d99d41435311211843279d1adef83f                                                           0.0s
    => => naming to docker.io/library/lab5                                                                                                                0.0s

    View build details: docker-desktop://dashboard/build/default/default/ziz875f1razwi4n87vnn28w54

    What's Next?
    View a summary of image vulnerabilities and recommendations → docker scout quickview

Polecenie uruchamiające serwer:

    docker run -p 8080:8080 --name lab5:1.0 lab5

Wynik działania polecenie run:

    Aplikacja działa na http://localhost:8080

Potwierdzenie działania kontenera:

    docker ps --filter "ancestor=lab5"

Sprawdzenie dostępności:

    curl http://localhost:8080

Rezultat:

Adres IP serwera: <IP_ADDRESS>
Nazwa serwera (hostname): <HOSTNAME>
Wersja aplikacji: <VERSION>
