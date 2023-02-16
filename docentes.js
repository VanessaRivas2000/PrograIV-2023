Vue.componet('component-docentes',{

    data() {
        return {
            db:'',
            accion:'nuevo',
            buscar: '',
            docentes: [],
            docente:{
                idDocente : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarDocente(){
            let store = this.abrirStore('tbldocentes', 'readwrite');
            if(this.accion==='nuevo'){
                this.docente.idDocente = new Date().getTime().toString(16);
            }
            store.put( JSON.parse(JSON.stringify(this.docente) ) );
            this.listarDocentes();
            this.nuevoDocente();
        },
        eliminarDocente(docente){
            if( confirm(`Esta seguro de eliminar a ${docente.nombre}?`) ){
                let store = this.abrirStore('tbldocentes', 'readwrite'),
                    req = store.delete(docente.idDocente);
                req.onsuccess = resp=>{
                    this.listarDocentes();
                };
            }
        },
        nuevoDocente(){
            this.accion = 'nuevo';
            this.docente.idDocente = '';
            this.docente.codigo = '';
            this.docente.nombre = '';
        },
        modificarDocente(docente){
            this.accion = 'modificar';
            this.docente = docente;
        },
        listarDocentes(){
            let store = this.abrirStore('tbldocentes', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.docentes = data.result
                    .filter(docente=>docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        docente.codigo.indexOf(this.buscar)>-1);
           
            }
        },
        template:
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE DOCENTE</div>
                    <div class="card-body">
                        <form id="frmDocente" @reset.prevent="nuevoDocente" v-on:submit.prevent="guardarDocente">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoDocente">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de docente de 3 digitos"
                                            v-model="docente.codigo" type="text" class="form-control" name="txtCodigoDocente" id="txtCodigoDocente">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreDocente">NOMBRE:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="docente.nombre" type="text" class="form-control" name="txtNombreDocente" id="txtNombreDocente">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE DOCENTES</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listarDocentes()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="2">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="docente in docentes" :key="docente.idDocente" @click="modificarDocente(docente)" >
                                    <td>{{ docente.codigo }}</td>
                                    <td>{{ docente.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarDocente(docente)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    },
});
