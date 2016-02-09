angular.module('app').factory('ngLayoutSvc', function ($location, ngIdentity, ngReloadSidenav) {
    var sidenavStructure = {
        Administrador: [
            {
                icon: "fa-users",
                item: "Usuarios",
                path: "",
                secondLevel: [
                    {
                        icon: "",
                        item: "Cadastrar Usuário",
                        path: "/newUser"
                    },
                    {
                        icon: "",
                        item: "Gerenciar Usuários",
                        path: "/allUsers"
                    }
                ]
            },
            {
                icon: "fa-book",
                item: "Processos",
                path: "",
                secondLevel: [
                    {
                        icon: "",
                        item: "Registrar Processo",
                        path: "/newProcess"
                    },
                    {
                        icon: "",
                        item: "Gerenciar Processos",
                        path: "/allProcesses"
                    }
                ]
            }
        ],
        Secretaria: [
            {
                icon: "fa-users",
                item: "Usuarios",
                path: "",
                secondLevel: [
                    {
                        icon: "",
                        item: "Cadastrar Usuário",
                        path: "/newUser"
                    },
                    {
                        icon: "",
                        item: "Gerenciar Usuários",
                        path: "/allUsers"
                    }
                ]
            },
            {
                icon: "fa-book",
                item: "Processos",
                path: "",
                secondLevel: [
                    {
                        icon: "",
                        item: "Registrar Processo",
                        path: "/newProcess"
                    },
                    {
                        icon: "",
                        item: "Gerenciar Processos",
                        path: "/allProcesses"
                    }
                ]
            }
        ],
        Professor: {
            Basico: [

            ],
            CAD: [

            ]
        }
    };

    return {
        hasSideNavbar: function(){
            var path = $location.path();

            if ($location.path().indexOf("/", 1) > 0)
                path = path.substring(0, path.indexOf("/", 1));

            var pagesWithoutSidebar = [
                "/"
            ];

            return pagesWithoutSidebar.indexOf(path) === -1;
        },
        getSidenavStructure: function(){
            var sidenav = sidenavStructure[ngIdentity.getAccessLevel()];
            if (ngIdentity.getAccessLevel() === "Professor"){
                var teacherSidenav = [];
                for (var role in sidenav){
                    if (role === "Basico" || ngIdentity.isAuthorized(role)){
                        teacherSidenav = teacherSidenav.concat(sidenav[role]);
                    }
                }
                sidenav = teacherSidenav;
            }
            return sidenav;

        },
        changeSidenavTab: function(path){
            if (path && path !== "" && path !== "#")
                $location.path(path);
        },
        reloadSidenav: function(){
            ngReloadSidenav.reload();
        },
        location: $location,
        identity: ngIdentity,
    };
});
