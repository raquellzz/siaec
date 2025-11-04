package br.ufrn.imd.siaec.siaec_backend.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException() {
        super("Recurso não encontrado");
    }
}
