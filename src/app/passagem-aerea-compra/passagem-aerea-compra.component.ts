import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IPessoa } from '../interfaces/IPessoa';
import { PassagemAereaService } from '../passagem-aerea/passagem-aerea.service';


@Component({
  selector: 'app-passagem-aerea-compra',
  templateUrl: './passagem-aerea-compra.component.html',
  styleUrls: ['./passagem-aerea-compra.component.css']
})
export class PassagemAereaCompraComponent implements OnInit {

  public id_ida: any;
  public id_volta: any;
  public quant_pessoas: any;
  public valor_total: any;
  public dados_pessoas: Array<any>;

 

  public nome_cartao: any;
  public num_cartao: any;
  public venc_cartao: any;
  public crv: any;

  public parcelas: any;

  private i: number;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private passagemAereaService: PassagemAereaService,
    private router: Router
    ) {
    this.getParams()
    console.log(this.id_ida, this.id_volta, this.quant_pessoas)

    this.compra()
    this.dados_pessoas = []
    for(this.i = 0; this.i < this.quant_pessoas; this.i++) {
      this.dados_pessoas.push([])
    }
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit() {
  }

  private getParams() {
    this.route.queryParams.subscribe(params => {
      this.id_ida = params['id_ida'];
      this.id_volta = params['id_volta'];
      this.quant_pessoas = params['quant_pessoas']
  });
  }

  private compra() {
    
    this.passagemAereaService.getInfoVoo (this.id_ida, this.id_volta, this.quant_pessoas)
    .then(result => {
        this.valor_total = result;
        console.log(this.valor_total)
    })
    .catch(error => console.error(error))
  }

  public recebeDadosPessoas() {
    console.log(this.dados_pessoas)
  }

  public finalizarCompra() {
    console.log(this.passagemAereaService.finalizarCompra(this.quant_pessoas, this.dados_pessoas.toString(), this.id_ida, this.id_volta, 
      this.nome_cartao, this.num_cartao, this.crv, this.parcelas, this.venc_cartao, this.valor_total.toString()))
  }
  


}
