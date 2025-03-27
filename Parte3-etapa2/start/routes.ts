/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsuariosController = ()=> import('../app/controllers/usuarios_controller.js');
const AlunoController = ()=> import('../app/controllers/alunos_controller.js')

router.get('/', [UsuariosController,"index"])
router.post('/', [UsuariosController,'store'])
router.put('/:cpf',[UsuariosController,'update'])
router.delete('/:cpf',[UsuariosController,'delete'])
router.get('aluno',[AlunoController,'index'])
router.post('aluno',[AlunoController,'store'])
