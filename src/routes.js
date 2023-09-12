import { Router } from "express"
import NomeController from "./app/controllers/NomeController.js"

const router = Router()

router.get('/nomes', NomeController.index)
router.get('/nomes/:id', NomeController.show)
router.post('/nomes', NomeController.store)
router.put ('/nomes/:id', NomeController.update)
router.delete ('/nomes/:id', NomeController.delete)

export default router