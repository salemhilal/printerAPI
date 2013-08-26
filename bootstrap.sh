#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive
apt-get -qq update
apt-get -qq install python-software-properties python g++ make
add-apt-repository ppa:chris-lea/node.js
apt-get -qq update
apt-get -qq install nodejs
npm update