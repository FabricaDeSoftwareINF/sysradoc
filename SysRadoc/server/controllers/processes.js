module.exports = function(app){

	var Process = app.models.process;

	var controller = {};

    controller.createProcess = function(req, res){
        var processData = req.body;
        processData.situacao = "ABERTO";
        Process.count({idProfessor: processData.idProfessor, situacao: "ABERTO"}, function(err, countProcess){
            if (countProcess === 0){
                if (processData.tipo !== "Estágio Probatório"){
                    Process.create(req.body, function(err, process){
                        res.send({success: true});
                    });
                }
                else{
                    Process.count({idProfessor: processData.idProfessor, tipo: "Estágio Probatório"}, function(err, countEstagio){
                        if (count === 0){
                            Process.create(req.body, function(err, process){
                                res.send({sucess: true});
                            });
                        }
                        else{
                            res.send({err: "Este docente já realizou seu estágio probatório."});
                        }
                    });
                }
            }
            else{
                res.send({err: "Este docente já possui um processo em aberto."});
            }
        });


    };

	return controller;
};
