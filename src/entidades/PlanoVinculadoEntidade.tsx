﻿

export default class PlanoVinculadoEntidade {
	public SQ_CONTRATO_TRABALHO: number;
	public SQ_PLANO_PREVIDENCIAL: number;
	public NR_INSCRICAO: string;
	public SQ_SIT_PLANO?: number;
	public DT_SITUACAO?: Date;
	public SQ_MOT_SIT_PLANO?: number;
	public NR_IDENT_BANCARIO: string;
	public DT_DEFERIMENTO?: Date;
	public DT_INSC_PLANO: Date;
	public SQ_SIT_INSCRICAO?: number;
	public DT_PRIMEIRA_CONTRIB?: Date;
	public DT_VENC_CARENCIA?: Date;
	public PC_TAXA_MAXIMA?: number;
	public SQ_OPCAO_TRIBUTACAO?: number;
	public DT_OPCAO_TRIBUTACAO?: Date;
	public IR_FUNDADOR: string;
	public IR_GRUPO: string;
	public DT_INSC_ANTERIOR?: Date;
	public DT_ESPERA?: Date;
	public VL_RES_MATEMATICA?: number;
	public QT_PRAZO_JOIA?: number;
	public DT_OBITO?: Date;
	public VL_JOIA?: number;
	public DT_REINTEGRACAO?: Date;
	public DS_PLANO_PREVIDENCIAL: string;
	public DS_SIT_PLANO: string;
	public DS_SIT_INSCRICAO: string;
	public DS_MOT_SIT_PLANO: string;
	public NR_CODIGO_CNPB: string;
	public CD_INDICE_VALORIZACAO: string;
	public DS_OPCAO_TRIBUTACAO: string;
}