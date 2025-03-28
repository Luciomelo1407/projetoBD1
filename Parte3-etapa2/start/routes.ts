
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PlanosController from '#controllers/planos_controller';
import router from '@adonisjs/core/services/router'
const UsuariosController = ()=> import('../app/controllers/usuarios_controller.js');
const AlunoController = ()=> import('../app/controllers/alunos_controller.js')
const AssinaturaController = ()=> import('../app/controllers/assinaturas_controller.js')

router.get('/', [UsuariosController,"index"])
router.post('/', [UsuariosController,'store'])
router.put('/:cpf',[UsuariosController,'update'])
router.delete('/:cpf',[UsuariosController,'delete'])
router.get('aluno',[AlunoController,'index'])
router.post('aluno',[AlunoController,'store'])
router.delete('aluno/:matricula',[AlunoController,'delete'])
router.get('assinatura',[AssinaturaController,'index'])
router.post('assinatura',[AssinaturaController,'store'])
router.put('assinatura/:cpf',[AssinaturaController,'update'])
router.delete('assinatura/:cpf',[AssinaturaController,'delete'])
router.get('plano',[PlanosController,'index'])
router.post('plano',[PlanosController,'store'])
router.put('plano/:idplano',[PlanosController,'update'])
router.delete('plano/:idplano',[PlanosController,'delete'])
