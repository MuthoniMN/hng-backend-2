const express = require('express');
const { getUserOrgs, getOrg, addUserToOrg, addOrg } = require('../controllers/org');
const orgRouter = express.Router();

orgRouter.all('*', verifyToken)

orgRouter.get('/', getUserOrgs)
orgRouter.post('/', addOrg)
orgRouter.get('/:orgID', getOrg)
orgRouter.post('/:orgId/users', addUserToOrg)

module.exports = orgRouter;