"# node_js_backend_typescript_prisma_postegresql_tdd" 



Api Backend feito utilizando node js com typescript e prisma e com coberta de testes, autenticação, upload de fotos


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
