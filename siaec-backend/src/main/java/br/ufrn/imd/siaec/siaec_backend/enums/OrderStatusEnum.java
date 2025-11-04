package br.ufrn.imd.siaec.siaec_backend.enums;

public enum OrderStatusEnum {
    AWAITING_PAYMENT("awaiting_payment"),
    PREPARING("preparing"),
    IN_TRANSIT("in_transit"),
    COMPLETED("completed");

    private String text;

    OrderStatusEnum(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
