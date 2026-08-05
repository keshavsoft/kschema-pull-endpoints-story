import express from 'express';

import funcFromdel from './del/controller.js';
import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import funcFrommodify from './modify/controller.js';
import funcFromshowAll from './showAll/controller.js';

const tableName = "bills.json";
const tablePath = "Data/bills.json";
const configPath = "Config/Schemas/bills.json";

const router = express.Router();

router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));
router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.put('/modify', express.json(), (req, res) => funcFrommodify({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };