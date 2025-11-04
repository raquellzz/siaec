package br.ufrn.imd.siaec.siaec_backend.enums;

public enum AccountStatusEnum {
    ACTIVE("active"),
    SUSPENDED("suspended");

    private String text;

    AccountStatusEnum(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
