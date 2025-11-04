package br.ufrn.imd.siaec.siaec_backend.exception;

import java.util.Arrays;

public class ValidationException extends RuntimeException {
    public ValidationException(String[] fields) {
        super("Campos inválidos: " + Arrays.toString(fields));
    }

    public ValidationException(String message) {
        super(message);
    }
}
