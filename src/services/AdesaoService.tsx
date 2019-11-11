import { BaseService, TipoRequisicao, TipoResposta } from "@intechprev/service";

import EmpresaEntidade from "../entidades/EmpresaEntidade";
import GrauParentescoEntidade from "../entidades/GrauParentescoEntidade";
import EstadoCivilEntidade from "../entidades/EstadoCivilEntidade";
import NacionalidadeEntidade from "../entidades/NacionalidadeEntidade";
import UFEntidade from "../entidades/UFEntidade";
import BancoAgEntidade from "../entidades/BancoAgEntidade";
import LimiteContribuicaoEntidade from "../entidades/LimiteContribuicaoEntidade";
import AdesaoEntidade from "../entidades/AdesaoEntidade";

class AdesaoService extends BaseService {

    constructor() {
        super("Adesao");
    }

	EnviarEmail = (email: string) => 
		this.CriarRequisicao<string>(TipoRequisicao.GET, null, `EnviarEmail/${email}`);

	ConfirmarToken = (tokenDigitado: string, tokenEnviado: string) => 
		this.CriarRequisicao<string>(TipoRequisicao.GET, null, `ConfirmarToken/${tokenDigitado}/${tokenEnviado}`);

	BuscarEmpresas = () => 
		this.CriarRequisicao<Array<EmpresaEntidade>>(TipoRequisicao.GET, null, `BuscarEmpresas`);

	BuscarListaSexo = () => 
		this.CriarRequisicao<Array<any>>(TipoRequisicao.GET, null, `BuscarListaSexo`);

	BuscarListaGrauParentesco = () => 
		this.CriarRequisicao<Array<GrauParentescoEntidade>>(TipoRequisicao.GET, null, `BuscarListaGrauParentesco`);

	BuscarListaEstadoCivil = () => 
		this.CriarRequisicao<Array<EstadoCivilEntidade>>(TipoRequisicao.GET, null, `BuscarListaEstadoCivil`);

	BuscarListaNacionalidade = () => 
		this.CriarRequisicao<Array<NacionalidadeEntidade>>(TipoRequisicao.GET, null, `BuscarListaNacionalidade`);

	BuscarListaUF = () => 
		this.CriarRequisicao<Array<UFEntidade>>(TipoRequisicao.GET, null, `BuscarListaUF`);

	BuscarListaBancos = () => 
		this.CriarRequisicao<Array<BancoAgEntidade>>(TipoRequisicao.GET, null, `BuscarListaBancos`);

	BuscarPercentuais = (cdPlano: string) => 
		this.CriarRequisicao<Array<any>>(TipoRequisicao.GET, null, `BuscarPercentuais/${cdPlano}`);

	BuscarLimitePatrocinadora = (cdPlano: string) => 
		this.CriarRequisicao<LimiteContribuicaoEntidade>(TipoRequisicao.GET, null, `BuscarLimitePatrocinadora/${cdPlano}`);

	BuscarFuncionario = (cdEmpresa: string, numMatricula: string, cpf: string, dataNascimento: string) => 
		this.CriarRequisicao<any>(TipoRequisicao.GET, null, `BuscarFuncionario/${cdEmpresa}/${numMatricula}/${cpf}/${dataNascimento}`);

	BuscarPlanos = (cdEmpresa: string, numMatricula: string) => 
		this.CriarRequisicao<Array<any>>(TipoRequisicao.GET, null, `BuscarPlanos/${cdEmpresa}/${numMatricula}`);

	ValidarCPF = (cpf: string) => 
		this.CriarRequisicao<string>(TipoRequisicao.GET, null, `ValidarCPF/${cpf}`);

	ValidarDataNascimento = (nascimento: string) => 
		this.CriarRequisicao<string>(TipoRequisicao.GET, null, `ValidarDataNascimento/${nascimento}`);

	ValidarEmail = (email: string) => 
		this.CriarRequisicao<string>(TipoRequisicao.GET, null, `ValidarEmail/${email}`);

	Inserir = (adesao: AdesaoEntidade) => 
		this.CriarRequisicao<string>(TipoRequisicao.POST, null, `Inserir`, adesao);

}

export default new AdesaoService();