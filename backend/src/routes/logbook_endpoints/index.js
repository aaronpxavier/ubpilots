/**
 * API Version 1.0
 */

// Imports ------------------------------------------------------------------//
import express from '../../../node_modules/express';

// Variables ------------------------------------------------------------------//
const router = express.Router();

// Routes -------------------------------------------------------------------//

// default version 1.0 route
router.get('/',(req,res)=>{
    res.json({
        msg: 'forms end point root works'
    });
}); // end router.get(/)

// Exports ------------------------------------------------------------------//

export default router;
