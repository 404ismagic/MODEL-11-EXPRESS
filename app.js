// Dependencies & Express Data Parsing
const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;
const { notes } = require("./db/db");