import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albaran',
  templateUrl: './albaran.component.html',
  styleUrls: ['./albaran.component.scss']
})
export class AlbaranComponent implements OnInit {

  table_header: any
  albaranForm: FormGroup
  detallealbaranForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioAlbaran()
    this.formularioDetalleAlbaran()
    this.getDataAlbaran()
    this.getDataMaterial()


    this.table_header = [
      {
        id: 'N°',
        idpedido: 'Pedido',
        fecha_entrega: 'Fecha',
        total: 'Total'
      }
    ]

  }

  formularioAlbaran(){
    this.albaranForm = this.formBuilder.group({
      id: [''],
      idpedido: ['',[Validators.required]],
      fecha_entrega: ['',Validators.required,Validators.pattern('(2019)/[1-12]{1,2}/[1-30]{1,2}')],
      total: [''],
    });
  }

  formularioDetalleAlbaran(){
    this.detallealbaranForm = this.formBuilder.group({
      id: [''],
      idalbaran: ['',[Validators.required]],
      cantidad: ['',[Validators.required, Validators.pattern('[1-30]{3,30}')]],
      precio: ['',[Validators.required,Validators.required,Validators.pattern('[1-9]{1,2}.[0-9]{1,2}')]],
      idmaterial: ['',[Validators.required]],
    });
  }

  //PAGINA PRINCIPAL
  respuestaAlbaran: any[]

  getDataAlbaran = () => {
    let tabla = 'albaran'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaAlbaran = data.datos
    })
  }

  idAlbaranVariable: number

  getDatabyID = (value) => {
    let tabla = 'albaran'
    this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { 
      this.idAlbaranVariable = data.datos[0].id
      localStorage.setItem("id", this.idAlbaranVariable.toString() )
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'albaran'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL


  //MODAL NEW ALBARAN
  
  postDataDetalleAlbaran = () => {
    let idalbaran = this.detallealbaranForm.get('idalbaran').value
    let idmaterial = this.detallealbaranForm.get('idmaterial').value
    let cantidad = this.detallealbaranForm.get('cantidad').value
    let precio = this.detallealbaranForm.get('precio').value
    let returning
    let tabla = 'detalle_albaran'
    let register = {tabla: tabla, datos: [{ idmaterial: idmaterial, cantidad: cantidad, idalbaran: this.idAlbaranVariable, precio: precio}]}
    
    if(this.detallealbaranForm.valid){
      this.http.post(environment.API_URL, register)
      .subscribe( data => { 
        returning = data
      })
      window.location.reload()
    }else{
      Swal.fire('Datos Incorrectos')
    }
  }
    
  //MODAL NEW ALBARAN

  //MODAL DETALLE ALBARAN
  respuestaMaterial: any[]

  getDataMaterial = () => {
    let tabla = 'material'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaMaterial = data.datos
    })
  }  
}