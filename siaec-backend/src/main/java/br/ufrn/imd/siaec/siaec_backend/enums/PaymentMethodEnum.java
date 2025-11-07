package br.ufrn.imd.siaec.siaec_backend.enums;

public enum PaymentMethodEnum {
    CREDIT_CARD("credit_card"),
    DEBIT_CARD("debit_card"),
    PIX("pix"),
    BOLETO("boleto");

    private String text;

    PaymentMethodEnum(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
