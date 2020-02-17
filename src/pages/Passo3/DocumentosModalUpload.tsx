import React from "react";
import axios from "axios";
import { Modal, CampoTexto, Form, Alerta, TipoAlerta } from "@intechprev/componentes-web";

import config from '../../config.json';
import { AdesaoDocumentoEntidade } from "../../entidades/";
import { Documentos } from "./Documentos";
import { AdesaoService } from "../../services";

interface Props {
    modalVisivel: boolean
    toggleModal: any;
    parent: Documentos;
}

interface State {
    tituloArquivo: string;
    nomeArquivoUpload: string;
    uploadPercentage: number;
    uploading: boolean;
}

export class DocumentosModalUpload extends React.Component<Props, State>{
    resetState = (): State => {
        return ({
            tituloArquivo: "",
            nomeArquivoUpload: "",
            uploadPercentage: 0,
            uploading: false
        });
    }

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();
    private upload = React.createRef<any>();

    state: State = this.resetState();

    uploadFile = async (e: any) => {
        try {
            const formData = new FormData()
            var arquivoUpload = e.target.files[0];

            formData.append("File", arquivoUpload, arquivoUpload.name);

            await this.setState({ uploading: true });

            var { data: result } = await axios.post(config.apiUrl + '/adesao/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: async progressEvent => {
                    await this.setState({
                        uploadPercentage: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    });
                },
            });

            await this.setState({
                nomeArquivoUpload: result,
                uploading: false,
                uploadPercentage: 0
            });
        } catch (err) {
            if (err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }

    salvar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();

        if (this.form.current.state.valido) {
            var documento = new AdesaoDocumentoEntidade();
            documento.TXT_NOME_FISICO = this.state.nomeArquivoUpload;
            documento.TXT_TITULO = this.state.tituloArquivo;

            var documento = await AdesaoService.SalvarDocumento(documento);
            await this.props.parent.salvarArquivo(documento);
            await this.setState(this.resetState());
            this.upload.current.value = null;
        }
    }

    render() {
        return (
            <div className={"m-3"}>
                <Modal
                    visivel={this.props.modalVisivel}
                    onClose={this.props.parent.toggleModal}
                    onConfirm={this.salvar}
                    titulo={"Upload de Documentos"}
                    tituloBotaoFechar={"Salvar"}
                >
                    <Form ref={this.form}>
                        <CampoTexto contexto={this}
                            nome={"tituloArquivo"}
                            valor={this.state.tituloArquivo}
                            label={"Título do Arquivo"}
                            obrigatorio
                            max={100}
                        />

                        <input
                            ref={this.upload}
                            name="selecionar-documento"
                            id="selecionar-documento"
                            type="file"
                            onChange={this.uploadFile}
                        />

                        {this.state.uploading &&
                            <div className="progress" style={{ marginBottom: 10 }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                    role="progressbar"
                                    style={{ width: this.state.uploadPercentage + "%" }}>

                                </div>
                            </div>
                        }

                        <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                    </Form>
                </Modal>
            </div>
        );
    }
}