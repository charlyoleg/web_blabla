===========================
Notes on OVH-VPS deployment
===========================


OVH Virtual Server
==================

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

Add a new user
--------------

OVH pre-installs Ubuntu and provides access to the *root* user. As it is not a good practice to run server-application directly as root, we create a new user called *bob*::

  adduser bob
  groups bob
  usermod -aG sudo bob


To access per ssh this VPS without password, run from your laptop::

  ssh-copy-id bob@vps12345.ovh.net
  ssh bob@vps12345.ovh.net


Install PM2
-----------

Inspiration from http://www.drmop.com/index.php/2016/09/06/installing-and-running-node-js-on-a-vps/

Install pm2_ globally, because systemd_ will use it as well::

  sudo npm i -g pm2


To restart all pm2 process after the server reboots::

  pm2 startup # and follow the instructions

  systemctl list-units --type service --all | grep pm2
  systemctl status pm2-bob
  ps aux | grep pm2
  pm2 ls


On your development laptop, you don't need to install pm2_ globally. If you want to practice it, just install it locally::

  npm i pm2
  npx pm2 ls
  npx pm2 logs blabla
  npx pm2 stop blabla
  npx pm2 kill

.. _pm2: https://pm2.keymetrics.io/
.. _systemd: https://www.freedesktop.org/wiki/Software/systemd/


port access right
-----------------

On Ubuntu, non-root user can not use per default the port-number smaller than 1024. You can grant the privileges with::

  sudo apt-get install libcap2-bin
  which node
  ls -l /usr/bin/node
  sudo setcap cap_net_bind_service=+ep /usr/bin/node

