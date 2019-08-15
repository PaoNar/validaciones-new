import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {

  materialesForm: FormGroup
  table_header:any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  filtroMateriales = '';
  ngOnInit() {
    this.getDataMaterial()
    this.getDataProveedor()
    this.getDataNicho()

    this.formularioMateriales()

    this.table_header = [
      {
        id: 'N°',
        nombre: 'Nombre',
        descripcion: 'Descripción',
        fecha_registro: 'Ingreso',
        fecha_actualizacion: 'Actualización',
        precio: 'Costo',
        idNicho: 'Almacenamiento',
        idProveedor: 'Proveedor'
      }
    ]
  }

  formularioMateriales(){
    this.materialesForm = this.formBuilder.group({
      id: [''],
      nombre: ['',[Validators.required, Validators.pattern('[A-Z]{1}[a-z]{3,30}')]],
      descripcion: ['',[Validators.required, Validators.pattern('[A-Z]{1}[A-Za-z]{5,30}')]],
      fecha_registro: ['',[Validators.required,Validators.pattern('(2019)/[1-12]{1,2}/[1-30]{1,2}')]],
      fecha_actualizacion: ['',[Validators.required,Validators.pattern('(2019)/[1-12]{1,2}/[1-30]{1,2}')]],
      precio: ['',[Validators.required,Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{1,2}')]],
      idnicho: ['',[Validators.required]],
      idproveedor: ['',[Validators.required]],
    });
  }

  //Pagina Principal
  respuestaMateriales:any[]

  getDataMaterial = () => {
    let tabla = 'material'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
        this.respuestaMateriales = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'material'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //Pagina Principal

  //MODAL NEW MATERIAL
  nuevafecha = new Date()
  fechaMaterial = this.nuevafecha.getDate() + "/" + (this.nuevafecha.getMonth() +1) + "/" + this.nuevafecha.getFullYear()

  postDataMateriales = () => {
    let nombre = this.materialesForm.get('nombre').value
    let descripcion = this.materialesForm.get('descripcion').value
    let fecha_registro = this.materialesForm.get('fecha_registro').value
    let fecha_actualizacion = this.materialesForm.get('fecha_actualizacion').value
    let precio = this.materialesForm.get('precio').value
    let idnicho = this.materialesForm.get('idnicho').value
    let idproveedor = this.materialesForm.get('idproveedor').value
    let returning
    let tabla = 'material'
    let register = {tabla: tabla, datos: [{nombre: nombre, descripcion: descripcion, fecha_registro: this.fechaMaterial, fecha_actualizacion: this.fechaMaterial, precio: precio, idnicho: idnicho, idproveedor: idproveedor}]}
<<<<<<< HEAD
    
    if(this.materialesForm.valid){
      this.http.post(environment.API_URL, register)
    .subscribe( data => { 
=======
    this.http.post(environment.API_URL, register)
    .subscribe( data => {
>>>>>>> 062db8996c10ce20b9639e9f840420ccd28400bf
      returning = data
    })
    window.location.reload()
  }else{
    Swal.fire('Datos Incompletos')
  }
}
    

  respuestaProveedor: any[]

  getDataProveedor = () => {
    let tabla = 'proveedor'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaProveedor = data.datos
    })
  }

  respuestaNicho: any[]

  getDataNicho = () => {
    let tabla = 'nicho'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaNicho = data.datos
    })
  }
  //MODAL NEW MATERIAL

}
