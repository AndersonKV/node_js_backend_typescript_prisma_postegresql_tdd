"# node_js_backend_typescript_prisma_postegresql_tdd" 



Api Backend feito utilizando node js com typescript e prisma e com coberta de testes, autenticação, upload de fotos


Explore a api

 ```diff
 
/*:::::USER CONTROLLER */<br/><br/>

+ POST /api/v1/users/create<br/><br/>
+ POST /api/v1/users/sign_in<br/>
# GET /api/v1/users/find_al<br/>
# GET /api/v1/users/find_by_id<br/>
# GET /api/v1/users/list_users<br/>
! PUT /api/v1/users/update<br/>
- DELETE /api/v1/users/delete_by_id<br/>
- DELETE /api/v1/users/destroyer<br/>

/*:::::JOB CONTROLLER */<br/>
+ POST /api/v1/jobs/create<br/>
# GET /api/v1/jobs/list_jobs<br/>
# GET /api/v1/jobs/find_by_id<br/>
# GET /api/v1/jobs/find_by_user_id<br/>
# GET /api/v1/jobs/find_the_last_three_jobs<br/>
# GET /api/v1/jobs/find_by_tech<br/>
- DELETE /api/v1/jobs/delete_by_id<br/>
- DELETE /api/v1/jobs/destroyer<br/>

/*:::::MATCHING CONTROLLER */<br/>
+ POST /api/v1/matchings/apply<br/>
# GET /api/v1/matchings/find_by_id<br/>
# GET /api/v1/matchings/find_by_user_id<br/>
# GET /api/v1/matchings/find_by_job_id<br/>
# GET /api/v1/matchings/find_all_by_user_id<br/>
# GET /api/v1/matchings/find_all<br/>
# GET /api/v1/matchings/delete_by_id<br/>
# GET/api/v1/matchings/delete_all<br/>

/*::::AUTH CONTROLLER::::*/<br/>
+ POST/api/v1/authenticate/dashboard<br/>
+ POST /api/v1/authenticate/dashboard/opportunity<br/>
+ POST /api/v1/authenticate/list_all_jobs<br/>
+ POST /api/v1/authenticate/find_by_job_id<br/>
+ POST /api/v1/authenticate/login<br/>

...
