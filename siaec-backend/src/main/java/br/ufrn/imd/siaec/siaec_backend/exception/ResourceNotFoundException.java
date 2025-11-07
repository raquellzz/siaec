package br.ufrn.imd.siaec.siaec_backend.exception;

/**
 * Exceção para ser lançada quando um recurso específico (ex: um produto ou
 * pedido) não é encontrado no banco de dados.
 * Mapeada para HTTP 404 Not Found pelo GlobalExceptionHandler.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}