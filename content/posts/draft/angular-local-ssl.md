---
categories:
    - angular
date: 2021-09-20T00:00:00Z
draft: true'
publish: false
title: Angular - Running SSL Locally
---

<!--more-->

## Creating the Certificate

1. Create a file called certificate.config with the following content

    ```ini
    [req]
    default_bits = 2048
    prompt = no
    default_md = sha256
    x509_extensions = v3_req
    distinguished_name = dn

    [dn]
    C = US
    ST = California
    L = California
    O = My Organisation
    OU = My Organisational Unit
    emailAddress = email@domain.com
    CN = localhost

    [v3_req]
    subjectAltName = @alt_names

    [alt_names]
    DNS.1 = localhost
    ```

1. Next, we can use OpenSSL to create the certificate.  I'm doing this on Windows using Git Bash and using the following command:

    ```shell
    openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 3560 -out localhost.crt -config certificate.config
    ```

## Running Angular CLI using https

Now that we have our certificate files, it is simple to configure Angular CLI to use these certificates to serve over https.  I stored the certificates in a certs folder under the Angular project directory.

1. To run ng serve with ssl using

    ```shell
    ng serve --ssl --ssl-key .\\certs\\localhost.key --ssl-cert .\\certs\\localhost.crt
    ```

1. Now open your browser and navigate to [https://localhost:4200](https://localhsot:4200)

When you navigate to the URL in Google Chrome you will be presented with a warning that the site is not secure because the certificarte is not in the certificate store.

## Trusting the certificate on Windows


