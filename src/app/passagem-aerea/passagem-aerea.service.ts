import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { IVoo } from 'src/app/interfaces/IVoo';
import { ICompra } from 'src/app/interfaces/ICompra';
import { IPessoa } from '../interfaces/IPessoa';

@Injectable({
  providedIn: 'root'
})
export class PassagemAereaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getVoos() {
    return this.httpClient.get<IVoo[]>(`${API_PATH}passagens/voos`).toPromise();
  }

  buscaVoo(ida_e_volta: boolean | undefined, 
            origem: string | undefined, 
            destino: string | undefined, 
            data_ida: string | undefined, 
            data_volta: string | undefined, 
            quant_pessoas:number| undefined) {
    return this.httpClient
    .get<IVoo[]>(`${API_PATH}passagens/busca/?ida_e_volta=${ida_e_volta}&origem=${origem}&destino=${destino}&data_ida=${data_ida}&data_volta=${data_volta}&quant_pessoas=${quant_pessoas}`).toPromise()}
  
  
  finalizarCompra(quant_pessoas: any, 
  dados_pessoas: any, 
  id_ida: any, 
  id_volta: any, 
  nome_cartao: any, 
  num_cartao: any, 
  crv: any, 
  parcelas: any, 
  venc_cartao: any,
  valor_total: any) {
    var finalizaCompra = {
      quant_pessoas: quant_pessoas, 
      dados_pessoas: dados_pessoas, 
      id_ida: id_ida, 
      id_volta: id_volta, 
      nome_cartao: nome_cartao, 
      num_cartao: num_cartao, 
      crv: crv, 
      parcelas: parcelas, 
      venc_cartao: venc_cartao,
      valor_total: valor_total
    } ;

    console.log(finalizaCompra)
    return this.httpClient.post<any>(`${API_PATH}passagens/finalizar-compra`, finalizaCompra)
    .toPromise();
  }
  
  getInfoVoo(id_ida: number, id_volta: number, quant_pessoas: number): Promise<any> {
        return this.httpClient
          .get<any>(`${API_PATH}passagens/compra/?id_ida=${id_ida}&id_volta=${id_volta}&quant_pessoas=${quant_pessoas}`)
          .toPromise();
  }                                                          
}
