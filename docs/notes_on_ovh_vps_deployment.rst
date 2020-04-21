===========================
Notes on OVH-VPS deployment
===========================


OVH Virtual Server
=================

OVH_ proposes price competitive *virtual server* called VPS_. It is a complete Ubuntu_ server, where you can install anything, inclusive nodejs_.

.. _OVH: https://www.ovh.com
.. _VPS: https://www.ovh.com/fr/vps/
.. _Ubuntu: https://ubuntu.com/
.. _nodejs: https://github.com/nodesource/distributions


Web_blabla environment variables
================================

This boilerplate express_ application reads several environment variables:

- NODE_ENV (it also influences express_ behavior)
- FORCE_HTTP
- PORT_NUM
- KEY_FILE
- CERT_FILE

.. _express: http://expressjs.com/en/5x/api.html#app.settings.table


Server Preparation
==================


