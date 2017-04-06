---
layout: post
title: 'Docker Ubuntu Proxy Setup'
date: 2017-04-05 06:00
categories: ['docker', 'proxy']
published: true
excerpt: | 

---

Getting Docker on Ubuntu to work with a proxy server is a little bit tricky.  First, you need to configure the docker service to use a proxy server.  Second, you also need to set the environment variable for your proxy servers when you run a container.  Third, if you execute a docker build you need to tell it about the proxy server

> Note: Replace all of the instances of http://proxy.example.com:80 with your proxy server url
{:.warning}

## Docker Service

The Docker daemon uses the HTTP_PROXY and NO_PROXY environmental variables in its start-up environment to configure HTTP proxy behavior. 

> Unfortunately, you cannot configure these environment variables using the daemon.json file.
{:.warning}


If you are behind an HTTP proxy server, you will need to add this configuration in the Docker systemd service file.

1. Create a systemd drop-in directory for the docker service:

    ```bash
    $ mkdir -p /etc/systemd/system/docker.service.d
    ```

1. Create a file called /etc/systemd/system/docker.service.d/http-proxy.conf that adds the HTTP_PROXY environment variable:

    ```bash
    [Service]
    Environment="HTTP_PROXY=http://proxy.example.com:80/"
    ```

1. If you have internal Docker registries that you need to contact without proxying you can specify them via the NO_PROXY environment variable:

    ```bash
    Environment="HTTP_PROXY=http://proxy.example.com:80/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"
    ```

1. Flush changes:

    ```bash
    $ sudo systemctl daemon-reload
    ```

1. Verify that the configuration has been loaded:

    ```bash
    $ systemctl show --property=Environment docker

    Environment=HTTP_PROXY=http://proxy.example.com:80/
    ```

1. Restart Docker:

    ```bash
    $ sudo systemctl restart docker
    ```

## Docker Containers

```bash
-e http_proxy=http://proxy.example.com:80 -e https_proxy=https://proxy.example.com:80
```

## Docker Build

``` bash
--build-arg HTTP_PROXY=http://proxy.example.com:80
```

> Note information for this article pruned from https://docs.docker.com/engine/admin/systemd/#http-proxy and https://blog.codeship.com/using-docker-behind-a-proxy/
{:.info}
