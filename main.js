var db;

    //createApp({
    var app = new Vue({
        el: "#app",
        data: {
            forms: {
                
                docente     : {mostrar:false},
                alumno      : {mostrar:false},
                materia     : {mostrar:false},
                matricula   : {mostrar:false},
                inscripcion : {mostrar:false},
            }                  
    },
    methods:{

    },
    created(){
        this.abrirBD();
    }
    });
   
     