import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  table_header: any
  proveedorForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioProveedor()
    this.getDataProveedores()

    this.table_header = [
      {
        id: 'N°',
        identificacion: 'Identificacíon',
        nombre: 'Nombre',
        direccion: 'Dirección',
        telefono: 'Teléfono'
      }
    ]
  }

  formularioProveedor() {
    this.proveedorForm = this.formBuilder.group({
      identificacion: ['',[Validators.required, Validators.pattern('([0|1|2]{1})([0-9]{9})')]],
      nombre: ['',[Validators.required, Validators.pattern('[A-Za-z]{1}[a-z]{3,30}')]],
      apellido: ['',[Validators.required, Validators.pattern('[A-Za-z]{1}[a-zñ]{3,30}')]],
      telefono: ['',[Validators.required, Validators.pattern('(((09)|(08)|(06)){1})([0-9]{8})')]],
      direccion: ['',[Validators.required]]
    });
  }

  //PAGINA PRINCIPAL
  respuestaProveedores: any[]

  getDataProveedores = () => {
    let tabla = 'proveedor'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
      .subscribe(data => {
        this.respuestaProveedores = data.datos
      })
  }

  deleteDataTable = (value) => {
    let tabla = 'proveedor'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
      .subscribe(data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL

  //MODAL NEW PROVEEDOR
  postDataProveedor = () => {
    
    let identificacion = this.proveedorForm.get('identificacion').value
    let nombre = this.proveedorForm.get('nombre').value
    let direccion = this.proveedorForm.get('direccion').value
    let telefono = this.proveedorForm.get('telefono').value

    let tabla = 'proveedor'
    let register = { tabla: tabla, datos: [{ identificacion: identificacion, 
                                              nombre: nombre, 
                                              direccion: direccion, 
                                              telefono: telefono }] }
    if(this.proveedorForm.valid){
      this.http.post(environment.API_URL, register)
      .subscribe(data => {
        // this.postData = data
      })
      window.location.reload()
    }else{
      Swal.fire('Datos Incompletos')
    }
  }

  //MODAL NEW PROVEEDOR
}
