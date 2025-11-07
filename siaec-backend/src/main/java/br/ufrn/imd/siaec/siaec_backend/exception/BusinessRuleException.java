package br.ufrn.imd.siaec.siaec_backend.exception;

/**
 * Exceção para ser lançada quando uma operação viola uma regra de negócio
 * (ex: estoque insuficiente, usuário inativo tentando comprar, etc.).
 * Mapeada para HTTP 409 Conflict pelo GlobalExceptionHandler.
 */
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}