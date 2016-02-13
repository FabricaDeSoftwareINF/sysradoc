module.exports = function(app){

	var Process = app.models.process,
        Request = app.models.request;

	var controller = {};


    controller.getProcesses = function(req, res){
        Process.find({}).populate("idProfessor idAvaliador").populate("radocs", "ano-base").exec(function(err, processes){
            res.send(processes);
        });
    };

    controller.getProcessesById = function(req, res){
        Process.find({idProfessor: req.params.id}).populate("idProfessor idAvaliador").populate("radocs", "ano-base").exec(function(err, processes){
            res.send(processes);
        });
    };

    controller.createProcess = function(req, res){
        var processData = req.body;
        if (processData.idAvaliador === "" || processData.idAvaliador === "-1")
            delete processData.idAvaliador;
        processData.situacao = "ABERTO";
        Process.count({idProfessor: processData.idProfessor, situacao: "ABERTO"}, function(err, countProcess){
            if (countProcess === 0){
                if (processData.tipo !== "Estágio Probatório"){
                    Request.count({idUsuario: processData.idProfessor, tipo: processData.tipo}, function(err, countRequest){
                        if (countRequest > 0){
                            Process.create(req.body, function(err, process){
                                Request.remove({idUsuario: processData.idProfessor, tipo: processData.tipo});
                                res.send({success: true});
                            });
                        }
                        else{
                            res.send({reason: "Não existe nenhuma solicitação de " + processData.tipo + " para este docente."});
                        }
                    });

                }
                else{
                    Process.count({idProfessor: processData.idProfessor, tipo: processData.tipo}, function(err, countType){
                        if (countType === 0){
                            Process.create(req.body, function(err, process){
                                res.send({success: true});
                            });
                        }
                        else{
                            res.send({reason: "Este docente já realizou seu estágio probatório."});
                        }
                    });
                }
            }
            else{
                res.send({reason: "Este docente já possui um processo em aberto."});
            }
        });


    };

    controller.updateAppraiser = function(req, res){
        if (req.body.idAvaliador === "" || req.body.idAvaliador === "-1")
            req.body.idAvaliador = undefined;
        Process.findOne({_id: req.body.id}).exec(function(err, proc){
            proc.idAvaliador = req.body.idAvaliador;
            proc.save();
            res.send({success: true});
        });
    };

	return controller;
};
