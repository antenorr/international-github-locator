'use strict'


/**
 * below is the eventlistner that will populate upon keyentry in real time
 */
let searchField = document.getElementById('searchUser');
searchField.addEventListener('keyup', function(event) {
    let userQuery =  event.target.value;
    console.log(userQuery);



        $.ajax({
            url: `https://api.github.com/users/${userQuery}`,
            data: {
                client_id: '2b23a50875ffa1405a6a',
                client_secret: '2f361c543a8f96705f6f5be655f0f62bd6dceea1'
            }
        }).done(function(user) {
            $.ajax({
                url: `https://api.github.com/users/${userQuery}/repos`,
                data: {
                    client_id: '2b23a50875ffa1405a6a',
                    client_secret: '2f361c543a8f96705f6f5be655f0f62bd6dceea1',
                    sort:  'create: asc',
                    per_page: 5
                    }   // end data
            }).done(function (repo) {
                $('#profile').html(`
                     <p>User Name: ${user.login}</p>
                     <p>A.K.A.: ${user.name}</p>
                     <p>Hometown: ${user.location}</p>
                     <p>Profile Created: ${user.created_at}</p>
                     <img class="thumbnal avatar" src="${user.avatar_url}">
                     <p>${user.bio}</p>
                     <h3 class="page-header">Most known for Repositories:</h3>  
                `);

                $.each (repo, function (index, element) {
                  let repos = `
                        <p><strong>Project: ${element.name}</strong></p>
                        <p>Project Description: ${element.description}</p>
                        <p> <a target="_blank" href="${element.html_url}">Repository github-Pages index page:</a></p>
                        <p>Language used: ${element.language}</p>
                        <p><a target="_blank" href="${element.url}">Repo page<a/></p>
                      
                        
                        <p class="label label-default">forks: ${element.forks.count}</p>
                        <p class="label label-primary">watchers: ${element.watchers_count}</p>
                        <p class="label label-success">Stars: ${element.stargazers_count}</p>
                        <p>forks: ${element.id}</span>
                        <div id="repos"></div>
                        <br />
                        <br />
                        `
                     $('#profile').append(repos);
                }) //end function $.each
            })




             
        }) //done user
               
                        



}); //end keyup     








       //now make request to Github
    // $.ajax({
    //     url: `https://api.github.com/users/${userQuery}`,
    //     data: {
    //         client_id: '2b23a50875ffa1405a6a',
    //         client_secret: '2f361c543a8f96705f6f5be655f0f62bd6dceea1'
    //     }
    //     }).done(function(user){//user is the data returned from api call
    //     $.ajax({
    //         url: `https://api.github.com/users/${userQuery}/repos`,
    //         data: {
    //             client_id: '2b23a50875ffa1405a6a',
    //             client_secret: '2f361c543a8f96705f6f5be655f0f62bd6dceea1',
    //             sort:  'create: asc',
    //             per_page: 5
    //              }   // end data
    //     }).done(function(repos) {
    //         $.each(repos, function(index, repo) {
        
    //             $('#repos').append(`
    //                 <div class="well">
    //                     <div class="row">
    //                         <div class="col-md-7">
    //                             <strong>${repo.name}</strong>:${repo.description}
    //                         </div>
    //                          <div class="col-md-3">
    //                             <span class="label label-default">forks: ${repo.forks.count}</span>
    //                             <span class="label label-primary">watchers: ${repo.watchers_count}</span>
    //                             <span class="label label-success">Stars: ${repo.stargazers_count}</span>
    //                         </div>
    //                          <div class="col-md-2">
    //                             <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
    //                         </div>

    //                     </div>
    //                 </div>
    //             `)
    //         })
    //     })
    //     $('#profile').html(`
    //     <div class="panel panel-default">
    //         <div class="panel-heading">
    //             <h3 class="panel-title">${user.name}</h3>
    //         </div>
    //         <div class="panel-body">
    //             <div class="row">
    //                 <div class="col-md-3">
    //                     <img class="thumbnal avatar" src="${user.avatar_url}">
    //                     <a target="_blank" class="btn btn-primary btn-black" href="${user.html_url}">View Profile</a>

    //                 </div>
    //                 <div class="col-md-9">
    //                     <span class="label label-default">Public repos: ${user.public_repos}</span>
    //                     <span class="label label-primary">Public Gists: ${user.public_gists}</span>
    //                     <span class="label label-success">Follower: ${user.followers}</span>
    //                     <span class="label label-info">following:${user.following}</span>
    //                     <br><br>
    //                     <ul class="list-grou">
    //                         <li class="list-group-item">Conpany: ${user.company}</li>
    //                         <li class="list-group-item">Website/blog: ${user.blog}</li>
    //                         <li class="list-group-item">Location: ${user.location}</li>
    //                         <li class="list-group-item">Member Since: ${user.created_at}</li>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    //     <h3 class="page-header">Latest Repos</h3>
    //     <div id="repos"></div>
        
    //     `)
    // });
//}); //end on keyup






