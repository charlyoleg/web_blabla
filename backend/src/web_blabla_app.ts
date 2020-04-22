// web_blabla_app.ts

"use strict";

import * as appCore from "./web_blabla_core";

// const express = require('express');
// const http = require('http');
// const https = require('https');
// const fs = require('fs');
import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";


// ####################################
// Initialization of the express-app
// ####################################

let default_app_http_port = 8442;
let default_app_https_port = 8443;
let default_key_filename = './server_dev.key';
let default_certificate_filename = './server_dev.crt';

if(process.env.NODE_ENV == "production"){
  console.log("Running in ENV production ...");
  default_app_http_port = 80;
  default_app_https_port = 443;
  default_key_filename = './server_prod.key';
  default_certificate_filename = './server_prod.crt';
} else {
  console.log("Running in ENV development ...");
}

const app_http_port = process.env.PORT_NUM || default_app_http_port;
const app_https_port = process.env.PORT_NUM || default_app_https_port;
const key_filename = process.env.KEY_FILE || default_key_filename;
const certificate_filename = process.env.CERT_FILE || default_certificate_filename;

console.log("Using files: " + key_filename + " and " + certificate_filename);

const ssl_options = {
    key: fs.readFileSync( path.join(__dirname, key_filename) ),
    cert: fs.readFileSync( path.join(__dirname, certificate_filename) )
};

const frontend_dist_dir = path.join(__dirname, '../../frontend/dist/');

//console.log('https port number: ' + app_https_port);
//console.log('__dirname: ' + __dirname);
console.log('frontend_dist_dir: ' + frontend_dist_dir);

const app = express();


// ####################################
// Browser security policy: Access-Control-Allow-Origin
// ####################################

app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


// ####################################
// end points
// ####################################

/**
 * @swagger
 * /calc_age:
 *   get:
 *     description: Returns the age of the user
 *     parameters:
 *       - name: birth_year
 *         in: query
 *         required: true
 *         description: the year of birth of the user
 *         schema:
 *           type:string
 *     responses:
 *       200:
 *         description: the age
 */
app.get("/calc_age", (req, res) => {
    console.log("app: calc_age: req.query.width: " + req.query.birth_year);
    const q_birth_year = parseInt( <string> req.query.birth_year);
    console.log("q_birth_year: " + q_birth_year);
    const r_age = appCore.calcAge(q_birth_year);
    res.send(r_age.toString());
});

/**
 * @swagger
 * /calc_birth_year:
 *   get:
 *     description: Returns the year of birth of the user
 *     parameters:
 *       - name: age
 *         in: query
 *         required: true
 *         description: the age of the user
 *         schema:
 *           type:string
 *     responses:
 *       200:
 *         description: the year of birth ot the user
 */
app.get("/calc_birth_year", (req, res) => {
    console.log("app: calc_year_birth: req.query.age: " + req.query.age);
    const q_age = parseInt(<string> req.query.age);
    const r_birth_year = appCore.calcBirthYear(q_age);
    res.send(r_birth_year.toString());
});

// the sugar
/**
 * @swagger
 * /call_activities:
 *   get:
 *     description: Returns statistics about the api activities
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: statistics
 */
app.get("/call_activities", (req, res) => {
    console.log("app: call_activities");
    res.json(appCore.callActivities());
});


// ####################################
// serve the static files
// ####################################

app.use('/', express.static(frontend_dist_dir));


// ####################################
// http-app just to redirect http to https
// ####################################

const http_app = express();

http_app.get("*", function (req, res, next) {
  const https_url = "https://" + req.hostname + ":" + app_https_port + req.originalUrl;
  //console.log("http redirects to : " + https_url);
  res.redirect(https_url);
});


// ####################################
// main while loop
// ####################################

if(process.env.HTTP_ENABLE){
  // ===> with http
  http.createServer(http_app).listen(app_http_port, () => {
    console.log('http_app  : listening at http port ' + app_http_port + ' to redirect to https');
  });
}

// ===> with https
https.createServer(ssl_options, app).listen(app_https_port, () => {
  console.log("https_app : listening at https port " + app_https_port);
});


