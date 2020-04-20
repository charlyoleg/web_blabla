// web_blabla_app.ts

"use strict";

import * as appCore from "./web_blabla_core";

// const express = require('express');
// const https = require('https');
// const fs = require('fs');
import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";


// ####################################
// Initialization of the express-app
// ####################################

const ssl_options = {
    key: fs.readFileSync( path.join(__dirname, './web_blabla_server.key') ),
    cert: fs.readFileSync( path.join(__dirname, './web_blabla_server.crt') )
};

//const app_http_port = 8442;
const app_https_port = 8443;

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
// main while loop
// ####################################

// ===> with http
// app.listen(app_http_port, () => {
//    console.log('app: listening at http port ' + app_http_port);
// });

// ===> with https
https.createServer(ssl_options, app).listen(app_https_port, () => {
    console.log("app: listening at https port " + app_https_port);
  });

