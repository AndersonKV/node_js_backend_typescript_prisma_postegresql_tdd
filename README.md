"# node_js_backend_typescript_prisma_postegresql_tdd" 



Api Backend  utilizando node com typescript e prisma e postegresql, utilizando principios solid e com cobertura de testes, tanto e2e, unit, integration, além de autenticação, upload de fotos, banco com relacionamento de one to many e many to one</br>

Tem criação de usuarios, posts, matching da vaga, se a vaga ja está vencida ou se o usuário ja aplicou.

Com api você pode criar um usuario ou compania e assim enviar um matching para uma vaga, estando como usuario ou enviando a vaga estando como compania, apenas usuario pode fazer o matching, a api possui validadores de campo, verificação, se quem está aplicando tem autorização ou autenticação, se ja aplicou antes</br>

Ao fazer busca do usuario é possivel pegar todos os matchings que ele fez ou compania todas as vagas que postou e todos que aplicaram a ela</br>


***Para configurar basta colocar seus dados no arquivo .env</br>***

E se quiser fazer os testes com as dependencias baixadas digite no terminal "yarn test:cov"

 
Um exemplo da cobertura de testes</br>
<img src="test.png"/>
 
 
 Explore a api

 ```diff
 
/*:::::USER CONTROLLER *

+ POST /api/v1/users/create
+ POST /api/v1/users/sign_in
# GET /api/v1/users/find_al
# GET /api/v1/users/find_by_id
# GET /api/v1/users/list_users
! PUT /api/v1/users/update
- DELETE /api/v1/users/delete_by_id
- DELETE /api/v1/users/destroyer

/*:::::JOB CONTROLLER *
+ POST /api/v1/jobs/create
# GET /api/v1/jobs/list_jobs
# GET /api/v1/jobs/find_by_id
# GET /api/v1/jobs/find_by_user_id
# GET /api/v1/jobs/find_the_last_three_jobs
# GET /api/v1/jobs/find_by_tech
- DELETE /api/v1/jobs/delete_by_id
- DELETE /api/v1/jobs/destroyer

/*:::::MATCHING CONTROLLER */
+ POST /api/v1/matchings/apply
# GET /api/v1/matchings/find_by_id
# GET /api/v1/matchings/find_by_user_id
# GET /api/v1/matchings/find_by_job_id
# GET /api/v1/matchings/find_all_by_user_id
# GET /api/v1/matchings/find_all
# GET /api/v1/matchings/delete_by_id
# GET/api/v1/matchings/delete_all

/*::::AUTH CONTROLLER::::*/
+ POST/api/v1/authenticate/dashboard
+ POST /api/v1/authenticate/dashboard/opportunity
+ POST /api/v1/authenticate/list_all_jobs
+ POST /api/v1/authenticate/find_by_job_id
+ POST /api/v1/authenticate/login

...


 
